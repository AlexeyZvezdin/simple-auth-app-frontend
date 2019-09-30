const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/"
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    // app: path.resolve(__dirname, "./src/index.js")
    app: PATHS.src
  },
  output: {
    filename: "[name].js",
    // path: path.resolve(__dirname, "../dist"),
    path: PATHS.dist,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
              removeComments: true,
              collapseWhitespace: false
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "postcss.config.js" }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "postcss.config.js" }
            }
          },
          {
            loader: "less-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
      publicPath: PATHS.dist
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: `${PATHS.src}/index.html`
    }),
    new copyWebpackPlugin([
      // { from: `${PATHS.src}/assets`, to: `${PATHS.assets}` },
      { from: `${PATHS.src}/static`, to: `` }
    ]),
    new Dotenv()
  ]
};

// devServer: {
//   overlay: true,
//   contentBase: "./public",
//   historyApiFallback: true
// },
