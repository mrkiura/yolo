var webpack = require('webpack');
module.exports = {
    entry: [
      "./public/static/js/app.js"
    ],
    output: {
        path: __dirname + '/public/static/js/build/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]

};
