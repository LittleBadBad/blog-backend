'use strict';

/**
 *  post controller
 */

const {createCoreController} = require('@strapi/strapi').factories;
const uid = 'api::post.post'


module.exports = createCoreController(uid, {
  drafts(ctx) {//todo
    const {user} = ctx.state;
    const id = user?.id
    if (!id) {
      return ctx.send({
        message: 'not allowed'
      }, 403)
    }
    return strapi.entityService.findMany(uid, {
      filters: {
        user: {
          id
        },
        publishedAt: {
          $null: true
        }
      }
    })
  },

  draft(ctx) {//todo
    const id = ctx.params.id
    const {user} = ctx.state;
    if (!user?.id) {
      return ctx.send({
        message: 'not allowed'
      }, 403)
    }
    return strapi.entityService.findOne(uid, id)
      .then(r => {
        return r?.publishedAt ? null : r
      })
  }
});
