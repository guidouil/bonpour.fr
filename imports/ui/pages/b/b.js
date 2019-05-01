import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './b.html';
import '/imports/ui/components/bon/bon';

Template.b.helpers({
  bonData() {
    const quantity = FlowRouter.getParam('quantity');
    const unity = FlowRouter.getParam('unity');
    return { quantity, unity };
  },
  label() {
    const label = FlowRouter.getParam('label');
    return label || '❤️';
  },
});
