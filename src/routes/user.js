const {SuccessModel, ErrorModal} = require("../model/resModel");
const {postUserLogin} = require("../controller/user");
const router = require('koa-router')()

router.prefix('/api/user')


//todo 测试session信息
router.get('/loginTest', async (ctx, next) => {
  if(ctx.session.userName){
    ctx.body = new SuccessModel({
      data: ctx.session
    });
  }else {
    ctx.body = new ErrorModal(null, '尚未登录');
  }
});

//todo 测试登录
router.get('/postLogin', async (ctx, next) => {
  let {userName, password} = ctx.query;

  let json = await postUserLogin({
    userName,
    password
  });
  let dataObj = json[0] || {};

  if(dataObj.userName){
    ctx.session.userName = userName;
    ctx.session.password = password;
    ctx.body = new SuccessModel({
      data: ctx.session
    });
  }else {
    ctx.body = new ErrorModal(null,'登录失败');
  }

});


router.post('/postLogin', async (ctx, next) => {
  let body = ctx.request.body;

  let json = await postUserLogin(body);
  let dataObj = json[0] || {};

  if(dataObj.userName){
    ctx.session.userName = userName;
    ctx.session.password = password;
    ctx.body = new SuccessModel({
      data: ctx.session
    });
  }else {
    ctx.body = new ErrorModal(null,'登录失败');
  }
})





module.exports = router
