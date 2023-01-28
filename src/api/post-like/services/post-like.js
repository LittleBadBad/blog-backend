'use strict';

/**
 * post-like service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::post-like.post-like');
