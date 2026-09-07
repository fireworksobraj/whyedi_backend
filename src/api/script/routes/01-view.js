'use strict';

/**
 * Public endpoint used by the /scripts detail page to record a read.
 * Kept separate from the core router so Strapi loads it alongside the defaults.
 */
module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/scripts/:slug/view',
      handler: 'script.incrementView',
      config: { auth: false, policies: [], middlewares: [] },
    },
  ],
};
