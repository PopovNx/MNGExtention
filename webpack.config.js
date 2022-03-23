const path = require('path');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const {ProvidePlugin} = require('webpack');
module.exports = {
    mode: "development",
    entry: './src/main.js',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new WebpackExtensionManifestPlugin({
            config: {
                base: 'src/manifest.json',
            },
            pkgJsonProps: [
                'version'
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
};