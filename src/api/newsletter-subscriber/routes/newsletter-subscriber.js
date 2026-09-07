'use strict';
const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    ...createCoreRouter('api::newsletter-subscriber.newsletter-subscriber').routes,
    {
      method: 'GET',
      path: '/newsletter-subscribers/unsubscribe',
      handler: 'newsletter-subscriber.unsubscribe',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
