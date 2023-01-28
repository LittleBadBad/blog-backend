'use strict';

/**
 *  collect controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::collect.collect');
