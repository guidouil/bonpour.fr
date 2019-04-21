import { Template } from 'meteor/templating';

import Stats from '/imports/api/stats/stats';

import './stats.html';

Template.stats.onCreated(() => {
  const instance = Template.instance();
  instance.subscribe('Counters');
});

Template.stats.helpers({
  counters() {
    return Stats.findOne({ _id: 'counters' });
  },
});
