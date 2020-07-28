const {checkIsNotLogin} = require("../utils/authUtils");
const {SuccessModel, ErrorModal} = require("../model/resModel");
const {getBlogList, getDetailById, addBlog, updateBlog, delBlog} = require("../controller/blog");
const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/getList', async (ctx, next) => {
  let author = ctx.query.author || '';
  let title = ctx.query.title || '';

  let result = await getBlogList(author, title);
  ctx.body = new SuccessModel(result);
})

router.get('/getDetailById', async (ctx, next) => {

  let id = ctx.query.id;
  let result = await getDetailById(id);
  ctx.body = new SuccessModel(result[0] || {});
});


router.post('/addBlog', checkIsNotLogin, async (ctx, next) => {

  let body = ctx.request.body;
  let json = await addBlog(body);

  if(json.insertId){
    ctx.body = new SuccessModel({
      id: json.insertId
    });
  }else {
    ctx.body = new ErrorModal(null,'添加失败');
  }
});

router.post('/updateBlog', checkIsNotLogin, async (ctx, next) => {

  let body = ctx.request.body;
  let json = await updateBlog(body);

  if (json.affectedRows > 0) {
    ctx.body = new SuccessModel({
      id: json.affectedRows
    });
  } else {
    ctx.body = new ErrorModal(null, '修改失败');
  }
});

router.post('/delBlog', checkIsNotLogin, async (ctx, next) => {

  let body = ctx.request.body;
  let json = await delBlog(body);

  if (json.affectedRows > 0) {
    ctx.body = new SuccessModel({
      id: json.affectedRows
    });
  } else {
    ctx.body = new ErrorModal(null, '删除失败');
  }
});


module.exports = router
