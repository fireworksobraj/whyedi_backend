'use strict';

/**
 * Public endpoint used by email unsubscribe links.
 * Kept separate from the core router so Strapi loads it alongside the defaults.
 */
module.exports = {
  routes: [
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
