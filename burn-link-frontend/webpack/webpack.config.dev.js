const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./client/main.tsx"],
  module: {
    rules: require("./webpack.rules.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "main.js",
    publicPath: "/",
  },
  plugins: require("./webpack.plugins.js"),
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: require("./webpack.aliases.js"),
  },
  stats: "errors-warnings",
  devtool: "inline-source-map", // Recommended for development
  devServer: {
    open: true,
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: true, // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    },
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: false,
  },
  watch: true,
};
