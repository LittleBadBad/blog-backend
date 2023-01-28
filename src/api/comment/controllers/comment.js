'use strict';

/**
 *  comment controller
 */

const {createCoreController} = require('@strapi/strapi').factories;
const uid = 'api::comment.comment'

module.exports = createCoreController('api::comment.comment', {
  count(ctx) {
    const {query} = ctx.request;
    return strapi.query(uid).count({where: query});
  },
  comment(ctx) {
    const {user} = ctx.state;
    const {id} = user || {}
    if (!id) {
      return ctx.send({
        message: 'not allowed'
      }, 403)
    }
    const {body} = ctx.request;
    const {post, reply_to, content} = body
    return strapi.entityService.create(uid, {
      data: {
        post,
        reply_to,
        content,
        user: id
      }
    })
  },
  remove(ctx) {
    const {user} = ctx.state;
    const {id} = user || {}
    if (!id) {
      return ctx.send({
        message: 'not allowed'
      }, 403)
    }
    const {body} = ctx.request;
    const {comment} = body
    return strapi.entityService
      .findOne(uid, comment, {populate: "user,post"})
      .then(async r => {
        if (id === await strapi.entityService
          .findOne('api::post.post', r.post.id, {populate: "user"})
          .then(r => r.user.id) || id === r.user.id) {
          return strapi.entityService.update(uid, comment, {
            data: {
              removed: true
            }
          })
        } else {
          return ctx.send({
            message: 'not allowed'
          }, 403)
        }
      })
  },
  findOne(ctx) {
    const id = ctx.params.id
    const {query} = ctx.request;
    return strapi.entityService.findOne(uid, id, {where: query})
      .then(r => {
        return {
          data: {
            ...r,
            content: r.removed ? null : r.content
          },
          meta: {}
        }
      }).catch(error => {
        return {
          data: null,
          error
        }
      })
  }
});
