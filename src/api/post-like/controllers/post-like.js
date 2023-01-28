'use strict';

const {isObject} = require("lodash/fp");
/**
 *  post-like controller
 */
const {ValidationError} = require('@strapi/utils').errors;
const {parseBody} = require('@strapi/strapi/lib/core-api/controller/transform');
const {createCoreController} = require('@strapi/strapi').factories;

const uid = 'api::post-like.post-like'

module.exports = createCoreController('api::post-like.post-like', ({strapi}) => ({
  count(ctx) {
    const {query} = ctx.request;
    return strapi.query(uid).count({where: query});
  },

  async like(ctx) {
    const {user} = ctx.state;
    if (!user?.id) {
      return ctx.send({
        message: 'not allowed'
      }, 403)
    }

    const {query} = ctx.request;
    const {data, files} = parseBody(ctx);

    if (!isObject(data)) {
      throw new ValidationError('Missing "data" payload in the request body');
    }

    const like = await strapi.entityService.findMany('api::post-like.post-like', {
      filters: {
        user,
        post: data.post
      }
    }).then(r => r[0])

    let entity
    if (!like) {
      entity = await strapi
        .service('api::post-like.post-like')
        .create({...query, data: {post: data.post, user: user.id}});
    } else {
      entity = await strapi.service('api::post-like.post-like')
        .delete(like.id, query)
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  /**
   * public       √
   * authenticate √
   * @deprecated
   * @param ctx
   * @return {*}
   */
  async my(ctx) {
    const {user} = ctx.state;
    const post = ctx.params.post
    if (!user?.id) {
      return ctx.send({
        message: 'not allowed'
      }, 403)
    }
    if (!post) {
      return ctx.send({
        message: 'bad request'
      }, 400)
    }

    const {query} = ctx;

    const {results, pagination} = await strapi.service(uid).find({
      ...query, filters: {
        user: {
          id: user.id
        },
        post: {
          id: post
        }
      }
    });
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, {pagination});
  }
}));
