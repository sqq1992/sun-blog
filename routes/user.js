const router = require('koa-router')()

router.prefix('/api/user')

router.post('/postLogin', async (ctx, next) => {
  let {userName, password} = ctx.request.body;

  ctx.body = {
    userName,
    password
  }
})


module.exports = router
