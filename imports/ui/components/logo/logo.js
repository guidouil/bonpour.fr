import { Template } from 'meteor/templating';
import sample from 'lodash/sample';
import { Conf } from '/imports/api/conf/conf';

import './logo.html';

Template.logo.helpers({
  classNames() {
    return this.classNames || '';
  },
  url() {
    let { url } = this;
    if (url && url.charAt(0) !== '/') {
      url = `http://${url}`;
    }
    return url;
  },
  src() {
    const conf = Conf.findOne({ _id: 'me' });
    const darkMode = (conf && conf.darkMode) || false;
    return (
      this.src || (!darkMode ? '/img/bonpour_n.svg' : '/img/bonpour_b.svg')
    );
  },
  target() {
    return this.target || '_self';
  },
});

Template.logo.events({
  'click #logo': (event, templateInstance) => {
    const effect = sample(['jiggle', 'tada', 'bounce', 'flash', 'shake']);
    templateInstance.$('#logo').transition(effect);
  },
});
