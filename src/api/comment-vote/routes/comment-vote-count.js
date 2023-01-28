module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/comment-votes/count',
      handler: 'comment-vote.count',
    },
  ]
}
