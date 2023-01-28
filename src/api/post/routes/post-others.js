module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/posts/drafts',
      handler: 'post.drafts',
    },
    {
      method: 'GET',
      path: '/posts/drafts/:id',
      handler: 'post.draft',
    },
  ]
}
