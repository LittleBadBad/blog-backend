'use strict';

/**
 *  comment-vote controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment-vote.comment-vote', {
  count(ctx) {
    const {query} = ctx.request;
    return strapi.query('api::comment-vote.comment-vote').count({where: query});
  }
});
