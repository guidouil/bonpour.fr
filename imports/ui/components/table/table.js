import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './table.html';

Template.table.events({
  'click .tableRow': (event, templateInstance) => {
    const { id } = event.target.closest('tr');
    const { type } = templateInstance.data;
    FlowRouter.go(`/${type}/${id}`);
  },
});
