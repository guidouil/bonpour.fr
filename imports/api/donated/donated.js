// Definition of the Donated client-side collection
import { Mongo } from 'meteor/mongo';
import { PersistentMinimongo2 } from 'meteor/frozeman:persistent-minimongo2';

export const Donated = new Mongo.Collection('donated', { connection: null });
export const donatedObserver = new PersistentMinimongo2(Donated);
