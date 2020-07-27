

const {execSql} = require("../db/mysql");

// api: api/blog/list 获取全部博客列表
function getBlogList(author, title) {
    let sql = `select * from blogs where 1=1`;

    if(author){
        sql += ` and author='${author}' `;
    }

    if(title){
        sql += ` and title Like '%${title}%' `
    }

    sql += ` order by createtime desc`;

    return execSql(sql);
}

// api: api/blog/getDetailById
function getDetailById(id) {
    let sql = `select * from blogs where id='${id}' `;

    return execSql(sql);
}

// api: api/blog/addBlog
function addBlog(body){
    let {title, content, author} = body;
    let nowTime = +new Date();

    let sql = `insert into blogs (title,content,createtime,author) values ('${title}', '${content}', ${nowTime}, '${author}') `;

    return execSql(sql);
}

// api: api/blog/updateBlog
function updateBlog(body){
    let {id, title, content, author} = body;

    let sql = `update blogs set title='${title}', content='${content}' where id=${id}`;

    return execSql(sql);
}

// api: api/blog/delBlog
function delBlog(body){
    let {id} = body;

    let sql = `delete from blogs where id=${id}`;

    return execSql(sql);
}

module.exports = {
    getBlogList,
    addBlog,
    getDetailById,
    updateBlog,
    delBlog
};