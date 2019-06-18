const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wuchendi',
    port: '3306',
    database: 'myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句
// const sql = 'select * from users';
// const sql = 'select id, username from users';
// const sql = `update users set realname='wuchendi3' where username = 'wcd1'`;
const sql = `insert into blogs (title, content, createtime, author) values ('标题', '内容',1560818599043, 'wuchendi')`
con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

// 关闭连接
con.end()