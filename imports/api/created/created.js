// Definition of the Created client-side collection
import { Mongo } from 'meteor/mongo';
import { PersistentMinimongo2 } from 'meteor/frozeman:persistent-minimongo2';

export const Created = new Mongo.Collection('created', { connection: null });
export const createdObserver = new PersistentMinimongo2(Created);
