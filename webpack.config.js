const path = require("path"); //nodejs内置模块
const HtmlWebpackPlugin = require("html-webpack-plugin"); // HtmlWebpackPlugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理dist文件夹
// const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制静态资源
// const webpack = require("webpack"); // webpack
const resolve = (url) => path.resolve(__dirname, url); // 定义resolve
const join = (url) => path.join(__dirname, url); // 定义join

module.exports = {
    // 模式  development production none
    mode: "development",
    // 入口
    entry: "./src/main.ts",

    // 输出
    output: {
        path: resolve("dist"), // 输出路径
        // filename: "main.[hash].js", // 打包文件名
        filename: "main.[hash].js", // 打包文件名
    },

    // 设置几个别名
    resolve: {
        alias: {},
        extensions: ['.ts', '.tsx', '.json', '.js'],
    },

    // 模块 规则 xx-loader
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "style-loader", // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "sass-loader", // 将 Sass 编译成 CSS
                        options: {
                            implementation: require("dart-sass"),
                        },
                    },
                ],
            },
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        // options: {
                        //     // 指定特定的ts编译配置，为了区分脚本的ts配置
                        //     configFile: resolve(__dirname, './tsconfig.json'),
                        // },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },

    // 插件
    plugins: [
        // 清理dist文件夹
        new CleanWebpackPlugin(),
        // 加载index.html
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: resolve("public/index.html"),
        }),
        // 复制静态资源
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: resolve("public/static"),
        //             to: resolve("docs/static"),
        //         },
        //     ],
        // }),
    ],

    // 运行 server
    devServer: {
        // 允许配置从目录提供静态文件的选项
        static: {
            directory: join("public"),
        },
        compress: true, // 启用 gzip compression
        port: 9000,
        historyApiFallback: true, // 不跳转
        liveReload: true, // 实时刷新
        client: {
            logging: "none",
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
};
