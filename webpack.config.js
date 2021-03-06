const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { webpack } = require("webpack");

module.exports = {
  entry: "./app/index.js",
  devServer: {
    open: true,
  },
  module: {
    rules: [
      { test: /\.svg$/, use: "svg-inline-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(js)$/, use: "babel-loader" },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "app/index.html" })],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },
};
