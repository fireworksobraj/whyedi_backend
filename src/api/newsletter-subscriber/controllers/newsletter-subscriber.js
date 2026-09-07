'use strict';

/**
 * newsletter-subscriber controller
 *
 * Overrides `create` so the API token (used server-side by the Next.js
 * /api/newsletter/subscribe route) can POST a bare { email, source } and get
 * back a sane result whether the address is brand new, already confirmed,
 * or re-subscribing after having unsubscribed — instead of a raw "unique
 * constraint" 500. Also exposes a public GET unsubscribe link used by the
 * one-click unsubscribe URL in newsletter emails.
 */

const crypto = require('crypto');
const { createCoreController } = require('@strapi/strapi').factories;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = createCoreController('api::newsletter-subscriber.newsletter-subscriber', ({ strapi }) => ({
  async create(ctx) {
    const body = ctx.request.body?.data || ctx.request.body || {};
    const email = String(body.email || '').trim().toLowerCase();
    const source = String(body.source || 'website').trim().slice(0, 100);

    if (!email || !EMAIL_RE.test(email)) {
      return ctx.badRequest('A valid email address is required.');
    }

    const existing = await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber').findOne({
      where: { email },
    });

    if (existing) {
      if (existing.status === 'confirmed') {
        ctx.body = { data: existing, meta: { alreadySubscribed: true } };
        return;
      }
      const updated = await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber').update({
        where: { id: existing.id },
        data: { status: 'confirmed', source },
      });
      ctx.body = { data: updated, meta: { resubscribed: true } };
      return;
    }

    const created = await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber').create({
      data: {
        email,
        source,
        status: 'confirmed',
        unsubscribeToken: crypto.randomBytes(24).toString('hex'),
        publishedAt: new Date(),
      },
    });

    ctx.body = { data: created, meta: {} };
  },

  async unsubscribe(ctx) {
    const token = String(ctx.query.token || '');
    if (!token) {
      ctx.status = 400;
      ctx.body = 'Missing unsubscribe token.';
      return;
    }

    const subscriber = await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber').findOne({
      where: { unsubscribeToken: token },
    });

    if (!subscriber) {
      ctx.status = 404;
      ctx.body = 'Subscriber not found or link already used.';
      return;
    }

    await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber').update({
      where: { id: subscriber.id },
      data: { status: 'unsubscribed' },
    });

    ctx.status = 200;
    ctx.type = 'html';
    ctx.body = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Unsubscribed</title></head>
      <body style="font-family:sans-serif;background:#1a1a1a;color:#e5e7eb;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
        <div style="text-align:center;max-width:420px;padding:24px;">
          <h1 style="color:#ff6b35;">You're unsubscribed</h1>
          <p>${subscriber.email} will no longer receive WhyEdi newsletter emails.</p>
        </div>
      </body></html>`;
  },
}));
