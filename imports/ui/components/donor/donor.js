import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { sAlert } from 'meteor/juliancwirko:s-alert';

import './donor.html';
import '../bon/bon';
import '../deleteModal/deleteModal';

import Bons from '/imports/api/bons/bons';
import { Donated } from '/imports/api/donated/donated';

Template.donor.onCreated(() => {
  const instance = Template.instance();
  const donor = FlowRouter.getParam('donor');
  instance.subscribe('Bon.donor', donor);
  instance.autorun(() => {
    if (instance.subscriptionsReady()) {
      Tracker.afterFlush(() => {
        const bon = Bons.findOne({ donor });
        if (bon) {
          delete bon._id;
          Donated.upsert({ _id: donor }, { $set: bon });
        } else {
          sAlert.warning('Ce bon a été effacé.');
          Donated.remove({ _id: donor });
          FlowRouter.go('/');
        }
      });
    }
  });
});

Template.donor.helpers({
  bonData() {
    const donor = FlowRouter.getParam('donor');
    return Bons.findOne({ donor });
  },
});

Template.donor.events({
  'click .donorAction'(event) {
    const donor = FlowRouter.getParam('donor');
    const status = event.target.id;
    Meteor.call('Donor.status', { donor, status }, (error, success) => {
      if (error) sAlert.error(error.message);
      if (success) {
        sAlert.info('Bon mis à jour.');
        if (status === 'refused') {
          Donated.remove({ _id: donor });
          FlowRouter.go('/');
        }
      }
    });
  },
  'click #recode'() {
    const donor = FlowRouter.getParam('donor');
    Meteor.call('Donor.recode', donor, (error, success) => {
      if (error) sAlert.error(error.message);
      if (success) {
        sAlert.info('Bon mis à jour.');
      }
    });
  },
  'click .deleteBon'() {
    const donor = FlowRouter.getParam('donor');
    $('#deleteBonModal')
      .modal({
        onApprove() {
          Meteor.call('Donor.remove', donor, (error, success) => {
            if (error) sAlert.error(error.message);
            if (success) {
              sAlert.info('Bon effacé.');
              Donated.remove({ _id: donor });
              FlowRouter.go('/');
            }
          });
        },
      })
      .modal('show');
  },
});
