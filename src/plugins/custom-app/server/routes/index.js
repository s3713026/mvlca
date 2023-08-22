module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  
];
// "use strict";

// module.exports = {
//   "content-api": require('./content-api')
// };