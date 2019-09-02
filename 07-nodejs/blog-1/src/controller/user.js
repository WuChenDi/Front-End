const { exec, escape } = require("../db/mysql");

const login = (username, password) => {
    // if (username === "wcd" && password === "123") {
    //     return true
    // }
    // return false
    username = escape(username);
    password = escape(password);
    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `;
    console.log("sql is" + sql);
    return exec(sql).then(rows => {
        return rows[0] || {};
    });
};

module.exports = {
    login
};
