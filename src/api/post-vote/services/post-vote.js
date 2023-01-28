'use strict';

/**
 * post-vote service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::post-vote.post-vote');
