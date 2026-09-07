'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

const UID = 'api::market-brief.market-brief';

module.exports = createCoreController(UID, ({ strapi }) => ({
  /**
   * POST /api/market-briefs/:slug/view
   * Bumps viewCount by one. Never fails the caller — a lost view is not worth
   * a 500 on an article page.
   */
  async incrementView(ctx) {
    const { slug } = ctx.params;

    try {
      const [brief] = await strapi.documents(UID).findMany({
        filters: { slug: { $eq: slug } },
        fields: ['viewCount'],
        limit: 1,
      });

      if (!brief) return ctx.notFound('Brief not found');

      const viewCount = (brief.viewCount || 0) + 1;
      await strapi.documents(UID).update({
        documentId: brief.documentId,
        data: { viewCount },
      });

      return { data: { slug, viewCount } };
    } catch (err) {
      strapi.log.warn(`market-brief.incrementView failed for "${slug}": ${err.message}`);
      return { data: { slug, viewCount: null } };
    }
  },
}));
