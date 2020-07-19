

// api: api/blog/list
function getBlogList(id) {

    return [
        {
            id:1,
            title:'sun1',
            content: 'sun1',
            author:'sun1'
        },
        {
            id:2,
            title:'sun2',
            content: 'sun2',
            author:'sun2'
        },
        {
            id:3,
            title:'sun3',
            content: 'sun3',
            author:'sun3'
        },
        {
            id:4,
            title:'sun4',
            content: 'sun4',
            author:'sun4'
        },
        {
            id:5,
            title:'sun5',
            content: 'sun5',
            author:'sun5'
        }
    ];

}

function addBlog(obj){

    return{
        id: 6
    }
}


module.exports = {
    getBlogList,
    addBlog
};