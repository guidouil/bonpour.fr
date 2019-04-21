// Import client startup through a single index entry point
import { Meteor } from 'meteor/meteor';

import './routes.js';
import './trads.js';
import './sAlertConfig.js';

Meteor.startup(() => {
  navigator.serviceWorker
    .register('/sw.js')
    .catch((error) =>
      console.error('ServiceWorker registration failed: ', error),
    );
});
