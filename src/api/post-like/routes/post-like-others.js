module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/post-likes/count',
      handler: 'post-like.count',
    },
    {
      method: 'POST',
      path: '/post-likes/like',
      handler: 'post-like.like',
    },
    {
      method: 'GET',
      path: '/post-likes/my/:post',
      handler: 'post-like.my',
    },
  ]
}
