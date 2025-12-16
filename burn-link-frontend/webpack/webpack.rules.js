const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { inDev } = require("./webpack.helpers");
const { defineReactCompilerLoaderOption, reactCompilerLoader } = require("react-compiler-webpack");

module.exports = [
  {
    // Typescript loader
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    // CSS Loader
    test: /\.css$/,
    use: [
      { loader: inDev() ? "style-loader" : MiniCssExtractPlugin.loader },
      { loader: "css-loader" },
      { loader: "postcss-loader" },
    ],
  },
  {
    // More information here https://webpack.js.org/guides/asset-modules/
    // Assets loader excluding SVGs
    test: /\.(gif|jpe?g|tiff|png|webp|bmp|eot|ttf|woff|woff2)$/i,
    type: "asset",
    generator: {
      filename: "assets/[hash][ext][query]",
    },
  },
  {
    // SVG Loader for React components
    test: /\.svg$/,
    use: ["@svgr/webpack"],
    exclude: /fonts/,
  },
  {
    // YAML files
    test: /\.yaml$/,
    use: "yaml-loader",
  },
  // https://gitburn-link.com/facebook/create-react-app/issues/11865
  {
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  },
  // React compiler - https://react.dev/learn/react-compiler
  {
    test: /\.[mc]?[jt]sx?$/i,
    exclude: /node_modules/,
    use: [
      // babel-loader, swc-loader, esbuild-loader, or anything you like to transpile JSX should go here.
      // { loader: 'swc-loader' },
      {
        loader: reactCompilerLoader,
        options: defineReactCompilerLoaderOption({
          // React Compiler options goes here
        }),
      },
    ],
  },
];
