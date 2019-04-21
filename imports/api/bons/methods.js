// Methods related to Bons
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

import Bons from './bons.js';
import Stats from '../stats/stats';

Meteor.methods({
  'Creator.insert'({ quantity, unity }) {
    check(quantity, Number);
    check(unity, String);
    const _id = Bons.insert({
      quantity,
      unity,
      creator: Random.id(),
      donor: Random.id(),
      receiver: Random.id(),
      createdAt: new Date(),
    });
    const bon = Bons.findOne({ _id });
    Stats.upsert({ _id: 'counters' }, { $inc: { created: 1 } });
    return bon.creator;
  },

  'Donor.status'({ donor, status }) {
    check(donor, String);
    check(status, String);
    const bon = Bons.findOne({ donor });
    if (!bon) {
      throw new Meteor.Error('404', 'JE NE TROUVE PAS CE BON.');
    }
    const update = {};
    update[status] = 1;
    Stats.upsert({ _id: 'counters' }, { $inc: update });
    return Bons.update(
      { _id: bon._id },
      { $set: { donorStatus: status, updatedAt: new Date() } },
    );
  },

  'Receiver.status'({ receiver, status }) {
    check(receiver, String);
    check(status, String);
    const bon = Bons.findOne({ receiver });
    if (!bon) {
      throw new Meteor.Error('404', 'JE NE TROUVE PAS CE BON.');
    }
    const update = {};
    update[status] = 1;
    Stats.upsert({ _id: 'counters' }, { $inc: update });
    return Bons.update(
      { _id: bon._id },
      { $set: { receiverStatus: status, updatedAt: new Date() } },
    );
  },

  'Receiver.askCode'(receiver) {
    check(receiver, String);
    const bon = Bons.findOne({ receiver });
    if (!bon) {
      throw new Meteor.Error('404', 'JE NE TROUVE PAS CE BON.');
    }
    const code = Math.floor(1000 + Math.random() * 9000);
    Stats.upsert({ _id: 'counters' }, { $inc: { coded: 1 } });
    return Bons.update(
      { _id: bon._id },
      { $set: { code, codeCreated: true, updatedAt: new Date() } },
    );
  },

  'Donor.recode'(donor) {
    check(donor, String);
    const bon = Bons.findOne({ donor });
    if (!bon) {
      throw new Meteor.Error('404', 'JE NE TROUVE PAS CE BON.');
    }
    Stats.upsert({ _id: 'counters' }, { $inc: { recoded: 1 } });
    const code = Math.floor(1000 + Math.random() * 9000);
    return Bons.update(
      { _id: bon._id },
      { $set: { code, updatedAt: new Date() } },
    );
  },

  'Receiver.giveCode'({ receiver, code }) {
    check(receiver, String);
    check(code, Number);
    const bon = Bons.findOne({ receiver });
    if (!bon) {
      throw new Meteor.Error('404', 'JE NE TROUVE PAS CE BON.');
    }
    if (bon.code === code) {
      Stats.upsert({ _id: 'counters' }, { $inc: { finished: 1 } });
      return Bons.update(
        { _id: bon._id },
        { $set: { done: true, updatedAt: new Date() } },
      );
    }
    return false;
  },

  'Creator.remove'(creator) {
    check(creator, String);
    const bon = Bons.findOne({ creator });
    if (!bon) {
      throw new Meteor.Error('404', 'JE NE TROUVE PAS CE BON.');
    }
    Stats.upsert({ _id: 'counters' }, { $inc: { deleted: 1 } });
    return Bons.remove({ _id: bon._id });
  },

  'Donor.remove'(donor) {
    check(donor, String);
    const bon = Bons.findOne({
      donor,
      $or: [{ receiverStatus: 'refused' }, { done: true }],
    });
    if (!bon) {
      throw new Meteor.Error('404', 'JE NE TROUVE PAS CE BON.');
    }
    Stats.upsert({ _id: 'counters' }, { $inc: { deleted: 1 } });
    return Bons.remove({ _id: bon._id });
  },

  'Receiver.remove'(receiver) {
    check(receiver, String);
    const bon = Bons.findOne({
      receiver,
      $or: [{ donorStatus: 'refused' }, { done: true }],
    });
    if (!bon) {
      throw new Meteor.Error('404', 'JE NE TROUVE PAS CE BON.');
    }
    Stats.upsert({ _id: 'counters' }, { $inc: { deleted: 1 } });
    return Bons.remove({ _id: bon._id });
  },
});
