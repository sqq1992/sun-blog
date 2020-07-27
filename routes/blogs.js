const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/getList', async (ctx, next) => {
  ctx.body = {
    data: 'getList'
  }
})

router.get('/getDetailById', async (ctx, next) => {
  ctx.body = {
    title: 'getDetailById'
  }
})

module.exports = router
