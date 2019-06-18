const loginCheck = (username, password) => {
    if (username === "wcd" && password === "123") {
        return true
    }
    return false
}

module.exports = {
    loginCheck
}
