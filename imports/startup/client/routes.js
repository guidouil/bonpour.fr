import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '/imports/ui/layouts/body/body.js';
import '/imports/ui/layouts/light/light.js';
import '/imports/ui/pages/home/home.js';
import '/imports/ui/pages/stats/stats.js';
import '/imports/ui/pages/n/n.js';
import '/imports/ui/pages/b/b.js';
import '/imports/ui/pages/c/c.js';
import '/imports/ui/pages/d/d.js';
import '/imports/ui/pages/r/r.js';
import '/imports/ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('AppBody', { main: 'App_home' });
  },
});

FlowRouter.route('/n', {
  name: 'n',
  action() {
    BlazeLayout.render('AppBody', { main: 'n' });
  },
});

FlowRouter.route('/b/:quantity/:unity/:label?', {
  name: 'b',
  action() {
    BlazeLayout.render('AppBody', { main: 'b' });
  },
});

FlowRouter.route('/stats', {
  name: 'stats',
  action() {
    BlazeLayout.render('AppBody', { main: 'stats' });
  },
});

FlowRouter.route('/c/:creator', {
  name: 'c',
  action() {
    BlazeLayout.render('AppBody', { main: 'c' });
  },
});

FlowRouter.route('/d/:donor', {
  name: 'd',
  action() {
    BlazeLayout.render('AppBody', { main: 'd' });
  },
});

FlowRouter.route('/r/:receiver', {
  name: 'r',
  action() {
    BlazeLayout.render('AppBody', { main: 'r' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('AppBody', { main: 'App_notFound' });
  },
};
