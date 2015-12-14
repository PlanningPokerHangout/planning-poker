import webpack from 'webpack';

import SplitByPathPlugin from 'webpack-split-by-path';
import ResolverPlugin from 'webpack/lib/ResolverPlugin';

import path from 'path';

export default {
    devtool: "source-map",
    entry: './src/app.jsx',
    output: {
        path: 'publish/build',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src'),
        }],
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: { warnings: false },
        }),
        new ResolverPlugin(
            new ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new SplitByPathPlugin([{
            name: 'vendor',
            path: [
                path.join(__dirname, 'node_modules'),
                path.join(__dirname, 'bower_components'),
            ],
        }]),
    ],
};
