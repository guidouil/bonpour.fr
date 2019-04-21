// Definition of the Stats collection
import { Mongo } from 'meteor/mongo';

const Stats = new Mongo.Collection('stats');

// Deny all client-side updates on the Stats collection
Stats.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

export default Stats;
