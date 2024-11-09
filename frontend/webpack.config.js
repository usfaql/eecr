const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
          chunks: 'all', // لتقسيم الشفرة من كل أنواع الكتل (المحمّلات، المكونات)
          minSize: 20000, // الحد الأدنى لحجم الملفات المقطعة
          maxSize: 0, // لا حد أقصى
          minChunks: 1, // يجب أن تُستخدم في مكونين على الأقل
          maxAsyncRequests: 30, // الحد الأقصى للطلبات غير المتزامنة
          maxInitialRequests: 30, // الحد الأقصى للطلبات الأولية
          automaticNameDelimiter: '~', // فاصل أسماء الملفات الناتجة
          name: true, // استخدام الأسماء بشكل تلقائي
        },
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'images/',
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
};

