import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { sAlert } from 'meteor/juliancwirko:s-alert';

import { Created } from '/imports/api/created/created';
import { Conf } from '/imports/api/conf/conf';

import './new.html';
import '../bon/bon';

Template.new.onCreated(() => {
  const instance = Template.instance();
  instance.quantity = new ReactiveVar();
  instance.unity = new ReactiveVar();
});

Template.new.onRendered(() => {
  const instance = Template.instance();
  instance.autorun(() => {
    const conf = Conf.findOne({ _id: 'me' });
    if (conf) {
      instance.quantity.set(conf.quantity);
      instance.unity.set(conf.unity);
    }
  });
  $('#new').form({
    fields: {
      quantity: 'integer',
      unity: 'empty',
    },
  });
  $('#quantity').focus();
});

Template.new.helpers({
  quantity: () => Template.instance().quantity.get(),
  unity: () => Template.instance().unity.get(),
  bonData() {
    const quantity = Template.instance().quantity.get();
    const unity = Template.instance().unity.get();
    return { quantity, unity };
  },
});

Template.new.events({
  'input #quantity'(event, templateInstance) {
    const quantity = event.target.value;
    templateInstance.quantity.set(quantity);
    Conf.upsert({ _id: 'me' }, { $set: { quantity } });
  },
  'input #unity'(event, templateInstance) {
    const unity = event.target.value;
    templateInstance.unity.set(unity);
    Conf.upsert({ _id: 'me' }, { $set: { unity } });
  },
  'submit #new'(event, templateInstance) {
    event.preventDefault();
    const quantity = Number(templateInstance.quantity.get());
    const unity = templateInstance.unity.get();
    Meteor.call('Creator.insert', { unity, quantity }, (error, creator) => {
      if (error) sAlert.error(error.message);
      if (creator) {
        Created.upsert(
          { _id: creator },
          {
            quantity,
            unity,
            creator,
            createdAt: new Date(),
          },
        );
        sAlert.success('Bon créé');
        FlowRouter.go(`/c/${creator}`);
      }
    });
  },
  'reset #new'(event, templateInstance) {
    templateInstance.quantity.set('');
    Conf.upsert({ _id: 'me' }, { $unset: { quantity: 1 } });
    templateInstance.unity.set('');
    Conf.upsert({ _id: 'me' }, { $unset: { unity: 1 } });
  },
});
