module.exports = {
  mode: "production",
  entry: ["./client/main.tsx"],
  module: {
    rules: require("./webpack.rules"),
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
    clean: true,
  },
  plugins: [...require("./webpack.plugins")],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: require("./webpack.aliases"),
  },
  stats: "errors-warnings",
  optimization: {
    minimize: true,
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        },
      },
    },
  },
};
