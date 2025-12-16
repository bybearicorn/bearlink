const webpack = require("webpack");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[name].css",
  }),
  new NodePolyfillPlugin({
    additionalAliases: ["process"],
  }), // to support Buffer, needed by bip39
  new Dotenv(),
].filter(Boolean);
