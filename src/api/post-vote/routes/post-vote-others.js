module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/post-votes/count',
      handler: 'post-vote.count',
    },
    {
      method: 'POST',
      path: '/post-votes/vote',
      handler: 'post-vote.vote',
    },
    {
      method: 'GET',
      path: '/post-votes/my/:post',
      handler: 'post-vote.my',
    },
  ]
}
