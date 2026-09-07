'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

const UID = 'api::script.script';

module.exports = createCoreController(UID, ({ strapi }) => ({
  /**
   * POST /api/scripts/:slug/view
   * Bumps viewCount by one. Never fails the caller — a lost view is not worth
   * a 500 on a script page.
   */
  async incrementView(ctx) {
    const { slug } = ctx.params;

    try {
      const [script] = await strapi.documents(UID).findMany({
        filters: { slug: { $eq: slug } },
        fields: ['viewCount'],
        limit: 1,
      });

      if (!script) return ctx.notFound('Script not found');

      const viewCount = (script.viewCount || 0) + 1;
      await strapi.documents(UID).update({
        documentId: script.documentId,
        data: { viewCount },
      });

      return { data: { slug, viewCount } };
    } catch (err) {
      strapi.log.warn(`script.incrementView failed for "${slug}": ${err.message}`);
      return { data: { slug, viewCount: null } };
    }
  },
}));
