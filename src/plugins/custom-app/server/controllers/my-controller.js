'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('custom-app')
      .service('myService')
      .getWelcomeMessage();
  },
});
