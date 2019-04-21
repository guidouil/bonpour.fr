import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Bons from '../bons.js';

Meteor.publish('Bon.creator', (creator) => {
  check(creator, String);
  return Bons.find({ creator }, { fields: { code: 0 } });
});

Meteor.publish('Bon.donor', (donor) => {
  check(donor, String);
  return Bons.find({ donor }, { fields: { creator: 0, receiver: 0 } });
});

Meteor.publish('Bon.receiver', (receiver) => {
  check(receiver, String);
  return Bons.find({ receiver }, { fields: { creator: 0, donor: 0, code: 0 } });
});
