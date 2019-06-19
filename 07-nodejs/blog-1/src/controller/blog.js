const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return exec(sql)
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1560163275081,
        author: 'wcd'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含title content属性
    console.log('newBlog blogData...', blogData)

    return {
        id: 3, // 表示新建博客，插入到数据表里面的 id
    }
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的id
    // blogData 是一个博客对象，包含title content属性
    console.log('update blog', id, blogData)

    return true
}

const delBlog = (id) => {
    // id 就是要删除博客的 id

    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
