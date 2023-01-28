'use strict';

/**
 *  post-vote controller
 */

const {createCoreController} = require('@strapi/strapi').factories;
const {ValidationError} = require('@strapi/utils').errors;
const {parseBody} = require('@strapi/strapi/lib/core-api/controller/transform');
const {isObject} = require('lodash/fp');
const uid = 'api::post-vote.post-vote'

// function setAgree(body, query, agree) {
//   const type = agree ? "agree" : "disagree"
//   const reverseType = !agree ? "agree" : "disagree"
//   return strapi.entityService.findMany(uid, {
//     filters: {
//       user: {
//         id: body.user
//       },
//       post: {
//         id: body.post
//       },
//       type: type
//     }
//   }).then(r => r.length ? strapi.entityService.delete(uid, r[0].id) : strapi.entityService.findMany(uid, {
//     filters: {
//       user: {
//         id: body.user
//       },
//       post: {
//         id: body.post
//       },
//       type: reverseType
//     }
//   }).then(r => r.length ? strapi.entityService.delete(uid, r[0].id) : true)
//     .then(_ => strapi.entityService.create(uid, {data: body, ...query})))
// }

module.exports = createCoreController(uid, ({strapi}) => ({

  count(ctx) {
    const {query} = ctx.request;
    return strapi.query(uid).count({where: query});
  },

  async vote(ctx) {
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
    const sanitizedInputData = await this.sanitizeInput(data, ctx);

    const vote = await strapi.entityService.findMany(uid, {filters: {user, post: data.post}}).then(r => r[0])

    let entity
    if (!vote) {
      entity = await strapi
        .service(uid)
        .create({...query, data: {...sanitizedInputData, user: user.id}, files});
    } else {
      entity = vote.agree === data.agree ? await strapi.service(uid).delete(vote.id, query) :
        await strapi.service(uid)
          .update(vote.id, {...query, data: {...sanitizedInputData, user: user.id}, files})
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
