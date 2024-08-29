// @ts-check

import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const dirname = import.meta.dirname;

export default {
  mode: "development",
  entry: path.join(dirname, "index.js"),
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(dirname, "index.html"),
    }),
  ],
  devServer: {
    port: 22552,
    static: {
      directory: path.join(dirname, "testcase"),
      publicPath: "/",
    },
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "eval-source-map",
};
