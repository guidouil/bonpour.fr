import { Template } from 'meteor/templating';

import { Created } from '/imports/api/created/created';

import './created.html';
import '../table/table';

Template.created.helpers({
  creators: () => Created.find().fetch(),
});
