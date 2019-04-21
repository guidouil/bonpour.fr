// Definition of the Received client-side collection
import { Mongo } from 'meteor/mongo';
import { PersistentMinimongo2 } from 'meteor/frozeman:persistent-minimongo2';

export const Received = new Mongo.Collection('received', { connection: null });
export const receivedObserver = new PersistentMinimongo2(Received);
