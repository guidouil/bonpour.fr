import Bons from '/imports/api/bons/bons';

Bons._ensureIndex({ creator: 1 }, { name: 'creator' });
Bons._ensureIndex({ donor: 1 }, { name: 'donor' });
Bons._ensureIndex({ receiver: 1 }, { name: 'receiver' });
