import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './myBons.html';

import '../created/created.js';
import '../donated/donated.js';
import '../received/received.js';

import { Conf } from '/imports/api/conf/conf';

Template.myBons.onRendered(() => {
  $('.accordion').accordion();
});

Template.myBons.helpers({
  isActiveTab(name) {
    const conf = Conf.findOne({ _id: 'me' });
    if (conf && conf.tab) {
      return name === conf.tab ? 'active' : '';
    }
    return name === 'creator' ? 'active' : '';
  },
});

Template.myBons.events({
  'click .title': (event) => {
    Conf.upsert({ _id: 'me' }, { $set: { tab: event.target.id } });
  },
});
