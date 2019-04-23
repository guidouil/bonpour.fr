import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Conf } from '/imports/api/conf/conf';

Template.registerHelper('isMobile', () => Meteor.isMobile);

Template.registerHelper('isDevelopment', () => Meteor.isDevelopment);

Template.registerHelper('eq', (a, b) => a === b);

Template.registerHelper('or', (a, b) => a || b);

Template.registerHelper('and', (a, b) => a && b);

Template.registerHelper('isDark', (color) => {
  const conf = Conf.findOne({ _id: 'me' });
  if (conf && conf.darkMode === true) {
    return 'inverted' || color;
  }
  return '';
});

Template.registerHelper('toLocaleDate', (date) => {
  if (date && typeof date === 'object') {
    return date.toLocaleString();
  }
  return '';
});

Template.registerHelper('statusIcon', (status) => {
  let icon = 'grey linkify';
  switch (status) {
    case 'accepted':
      icon = 'teal check';
      break;
    case 'refused':
      icon = 'red close';
      break;
    default:
      break;
  }
  return icon;
});

Template.registerHelper('statusText', (status, actor) => {
  let text = '-----------';
  switch (status) {
    case 'accepted':
      text = 'Accepté par le ';
      break;
    case 'refused':
      text = 'Refusé par le ';
      break;
    default:
      break;
  }
  return text + actor;
});
