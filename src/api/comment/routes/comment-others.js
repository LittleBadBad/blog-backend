module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/comments/count',
      handler: 'comment.count',
    },
    {
      method: 'POST',
      path: '/comments/comment',
      handler: 'comment.comment',
    },
    {
      method: 'POST',
      path: '/comments/remove',
      handler: 'comment.remove',
    },
  ]
}
