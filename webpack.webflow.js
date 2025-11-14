/**
 * Webpack configuration for Webflow Code Components
 * This file is used to bundle React components for use in Webflow
 */

module.exports = {
  mode: 'production',
  entry: './src/components/CodeComponents/index.js',
  output: {
    filename: 'webflow-components.js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  optimization: {
    minimize: true
  }
}
