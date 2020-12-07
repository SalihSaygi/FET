"use strict";

var path = require("path");

module.exports = function (_env, argv) {
  var isProduction = argv.mode === "production";
  var isDevelopment = !isProduction;
  return {
    devtool: isDevelopment && "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/[name].[contenthash:8].js",
      publicPath: "/"
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: isProduction ? "production" : "development"
          }
        }
      }]
    },
    resolve: {
      extensions: [".js", ".jsx", "ts"]
    }
  };
};