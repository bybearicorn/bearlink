const { createWebpackAliases } = require("./webpack.helpers");

module.exports = createWebpackAliases({
  "@client": "client",
  "@server": "server",
});
