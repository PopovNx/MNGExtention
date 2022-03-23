const path = require('path');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
module.exports = {
    mode: "development",
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
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
            },
            {
                test: /\.html$/i,
                use: 'raw-loader',
            },
        ]
    }
};