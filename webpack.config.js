const modoDev = process.env.NODE_ENV !== 'production'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development': 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: "./dist"
        },
        port: 8080
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "flappy.css" }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
              },
              {
                test: /\.html$/i,
                loader: "html-loader",
              },
              {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
              },
              {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                type: 'asset/resource'
              },
              {
                  test: /\.(woff|woff2|eot|ttf|otf)$/i,
                  type: 'asset/resource'
              }
        ]
    }
}