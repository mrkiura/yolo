var webpack = require('webpack');
module.exports = {
    entry: [
      "./static/js/app.js"
    ],
    output: {
        path: __dirname + '/static/js/build/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ }, // to transform JSX into JS
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]

};
