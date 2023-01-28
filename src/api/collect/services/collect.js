'use strict';

/**
 * collect service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::collect.collect');
