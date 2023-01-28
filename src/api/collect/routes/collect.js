'use strict';

/**
 * collect router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::collect.collect');
