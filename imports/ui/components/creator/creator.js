import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import * as clipboard from 'clipboard-polyfill';
import { sAlert } from 'meteor/juliancwirko:s-alert';

import Bons from '/imports/api/bons/bons';
import { Created } from '/imports/api/created/created';

import './creator.html';
import '../bon/bon';
import '../deleteModal/deleteModal';

Template.creator.onCreated(() => {
  const instance = Template.instance();
  const creator = FlowRouter.getParam('creator');
  instance.subscribe('Bon.creator', creator);
  instance.autorun(() => {
    if (instance.subscriptionsReady()) {
      const bon = Bons.findOne({ creator });
      Tracker.afterFlush(() => {
        if (bon) {
          delete bon._id;
          Created.upsert({ _id: creator }, { $set: bon });
        } else {
          sAlert.warning('CE BON A ÉTÉ EFFACÉ.');
          Created.remove({ _id: creator });
          FlowRouter.go('/');
        }
      });
    }
  });
});

Template.creator.helpers({
  bonData() {
    const creator = FlowRouter.getParam('creator');
    return Bons.findOne({ creator });
  },
  toUrl(path, id) {
    return Meteor.absoluteUrl(`${path}/${id}`);
  },
});

Template.creator.events({
  'click .donorUrlField'(event) {
    $('#donorUrlInput').select();
    const url = $('#donorUrlInput').val();
    clipboard.writeText(url);
    $(event.currentTarget)
      .children('.copy.icon')
      .addClass('green');
    sAlert.success('Lien donneur copié');
    Meteor.setTimeout(() => {
      $(event.currentTarget)
        .children('.copy.icon')
        .removeClass('green');
    }, 3000);
  },
  'click .receiverUrlField'(event) {
    $('#receiverUrlInput').select();
    const url = $('#receiverUrlInput').val();
    clipboard.writeText(url);
    $(event.currentTarget)
      .children('.copy.icon')
      .addClass('green');
    sAlert.success('Lien receveur copié');
    Meteor.setTimeout(() => {
      $(event.currentTarget)
        .children('.copy.icon')
        .removeClass('green');
    }, 3000);
  },
  'click .deleteBon'() {
    const creator = FlowRouter.getParam('creator');
    $('#deleteBonModal')
      .modal({
        onApprove() {
          Meteor.call('Creator.remove', creator, (error, success) => {
            if (error) sAlert.error(error.message);
            if (success) {
              sAlert.info('Bon effacé');
              Created.remove({ _id: creator });
              FlowRouter.go('/');
            }
          });
        },
      })
      .modal('show');
  },
});
