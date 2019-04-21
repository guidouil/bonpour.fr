import { Template } from 'meteor/templating';

import './header.html';
import { Conf } from '/imports/api/conf/conf';

Template.header.helpers({
  darkModeIcon() {
    const conf = Conf.findOne({ _id: 'me' });
    return conf && conf.darkMode ? 'sun' : 'moon';
  },
});

Template.header.events({
  'click #darkMode'() {
    const conf = Conf.findOne({ _id: 'me' });
    const darkMode = (conf && conf.darkMode) || false;
    Conf.upsert({ _id: 'me' }, { $set: { darkMode: !darkMode } });
  },
});
