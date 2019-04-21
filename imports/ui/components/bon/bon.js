import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './bon.html';

Template.bon.helpers({
  bon: () => {
    const instance = Template.instance();
    const bon = instance.data.values;
    return bon;
  },
  color: () => {
    const instance = Template.instance();
    const bon = instance.data.values;
    let color = 'yellow';
    if (bon) {
      if (bon.donorStatus) {
        switch (bon.donorStatus) {
          case 'refused':
            color = 'red';
            break;
          case 'accepted':
            color = 'teal';
            break;
          default:
            break;
        }
      }
      if (bon.codeCreated) {
        color = 'blue';
      }
      if (bon.done) {
        color = 'green';
      }
    }
    return color;
  },
});

Template.bon.events({
  'click #infoBtn'() {
    $('#bonInfo').transition('drop');
  },
});
