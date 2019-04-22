import { Template } from 'meteor/templating';

import { Received } from '/imports/api/received/received';

import './received.html';
import '../table/table';

Template.received.helpers({
  receivers: () => Received.find().fetch(),
});
