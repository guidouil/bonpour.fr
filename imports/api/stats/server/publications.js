import { Meteor } from 'meteor/meteor';

import Stats from '../stats.js';

Meteor.publish('Counters', () => Stats.find({ _id: 'counters' }));
