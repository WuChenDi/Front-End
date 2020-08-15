const combineRoutes = require("koa-combine-routers");

const aroutes = require("./aRouter");
const broutes = require("./bRouter");

module.exports = combineRoutes(aroutes, broutes);
