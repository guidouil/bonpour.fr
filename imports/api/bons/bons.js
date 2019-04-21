// Definition of the Bons collection
import { Mongo } from 'meteor/mongo';

const Bons = new Mongo.Collection('bons');

// Deny all client-side updates on the Bons collection
Bons.deny({
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

export default Bons;
