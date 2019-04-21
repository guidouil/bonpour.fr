import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { sAlert } from 'meteor/juliancwirko:s-alert';

import './receiver.html';
import '../bon/bon';
import '../deleteModal/deleteModal';

import Bons from '/imports/api/bons/bons';
import { Received } from '/imports/api/received/received';

Template.receiver.onCreated(() => {
  const instance = Template.instance();
  const receiver = FlowRouter.getParam('receiver');
  instance.subscribe('Bon.receiver', receiver);
  instance.autorun(() => {
    if (instance.subscriptionsReady()) {
      Tracker.afterFlush(() => {
        const bon = Bons.findOne({ receiver });
        if (bon) {
          delete bon._id;
          Received.upsert({ _id: receiver }, { $set: bon });
        } else {
          sAlert.warning('CE BON A ÉTÉ EFFACÉ.');
          Received.remove({ _id: receiver });
          FlowRouter.go('/');
        }
      });
    }
  });
});

Template.receiver.helpers({
  bonData() {
    const receiver = FlowRouter.getParam('receiver');
    return Bons.findOne({ receiver });
  },
});

Template.receiver.events({
  'click .receiverStatus'(event) {
    const receiver = FlowRouter.getParam('receiver');
    const status = event.target.id;
    Meteor.call('Receiver.status', { receiver, status }, (error, success) => {
      if (error) sAlert.error(error.message);
      if (success) {
        sAlert.info('BON MIS À JOUR');
        if (status === 'refused') {
          Received.remove({ _id: receiver });
          FlowRouter.go('/');
        }
      }
    });
  },
  'click #askCode'() {
    const receiver = FlowRouter.getParam('receiver');
    $('#askCodeModal')
      .modal({
        onApprove() {
          Meteor.call('Receiver.askCode', receiver, (error, success) => {
            if (error) sAlert(error.message);
            if (success) {
              sAlert.info('CODE GÉNÉRÉ');
            }
          });
        },
      })
      .modal('show');
  },
  'input #code'(event) {
    const receiver = FlowRouter.getParam('receiver');
    const code = event.target.value;
    if (code && code.length >= 4) {
      Meteor.call(
        'Receiver.giveCode',
        { receiver, code: Number(code) },
        (error, success) => {
          if (error) sAlert(error.message);
          if (success) {
            sAlert.success('CODE VALIDÉ');
          } else {
            sAlert.error('CODE INVALIDE');
          }
        },
      );
    }
  },
  'click .deleteBon'() {
    const receiver = FlowRouter.getParam('receiver');
    $('#deleteBonModal')
      .modal({
        onApprove() {
          Meteor.call('Receiver.remove', receiver, (error, success) => {
            if (error) sAlert.error(error.message);
            if (success) {
              sAlert.info('BON EFFACÉ.');
              Received.remove({ _id: receiver });
              FlowRouter.go('/');
            }
          });
        },
      })
      .modal('show');
  },
});
