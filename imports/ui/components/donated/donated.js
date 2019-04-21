import { Template } from 'meteor/templating';

import { Donated } from '/imports/api/donated/donated';

import './donated.html';
import '../table/table';

Template.donated.helpers({
  donors: () => Donated.find().fetch(),
});
