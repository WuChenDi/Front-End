const xss = require("xss");
const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `;
	if (author) {
		sql += `and author='${author}' `;
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `;
	}
	sql += `order by createtime desc;`;

	return exec(sql);
};

const getDetail = (id) => {
	const sql = `select * from blogs where id='${id}'`;
	return exec(sql).then((rows) => {
		return rows[0];
	});
};

const newBlog = (blogData = {}) => {
	const title = xss(blogData.title);
	console.log("title is", title);
	const content = xss(blogData.content);
	const author = blogData.author;
	const createTime = Date.now();

	const sql = `
    insert into blogs (title, content, createTime, author)
    values ('${title}', '${content}', '${createTime}', '${author}');
  `;
	return exec(sql).then((inserData) => {
		console.log("insertData is", inserData);
		return {
			id: inserData.insertId,
		};
	});
};

const updateBlog = (id, blogData = {}) => {
	// id 就是要更新博客的id
	// blogData 是一个博客对象，包含title content属性
	// console.log('update blog', id, blogData)

	// return true
	const title = xss(blogData.title);
	const content = xss(blogData.content);

	const sql = `update blogs set title='${title}', content='${content}' where id='${id}'`;

	return exec(sql).then((updateData) => {
		console.log("updateData is ", updateData);
		return updateData.affectedRows > 0;
	});
};

const delBlog = (id, author) => {
	// id 就是要删除博客的 id

	// return true
	const sql = `delete from blogs where id='${id}' and author='${author}'`;
	return exec(sql).then((delData) => {
		console.log("delData is ", delData);
		return delData.affectedRows > 0;
	});
};

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog,
};
