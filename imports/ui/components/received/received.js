import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Received } from '/imports/api/received/received';

import './received.html';
import '../table/table';

Template.received.helpers({
  receivers: () => Received.find().fetch(),
});
