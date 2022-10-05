"use strict";

/**
 *  layout controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::home.home", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.entityService.findMany("api::home.home", {
      ...query,
      populate: {
        hero: {
          populate: {
            title: true,
            hero_img: true,
            description: true,
          },
        },
        article: {
          populate: {
            title: true,
            description: true,
          },
        },
        seo: {
          populate: {
            meta_title: true,
            meta_description: true,
          },
        },
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
