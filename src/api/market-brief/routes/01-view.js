'use strict';

/**
 * Public endpoint used by the /news detail page to record a read.
 * Kept separate from the core router so Strapi loads it alongside the defaults.
 */
module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/market-briefs/:slug/view',
      handler: 'market-brief.incrementView',
      config: { auth: false, policies: [], middlewares: [] },
    },
  ],
};
