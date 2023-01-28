'use strict';

/**
 * comment-vote service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::comment-vote.comment-vote');
