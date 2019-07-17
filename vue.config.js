var webpack = require('webpack')

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'RECAPTCHA_SITE_KEY': JSON.stringify(process.env.RECAPTCHA_SITE_KEY),
          'PAYMENTSPRING_GATEWAY_API_URL': process.env.PAYMENTSPRING_GATEWAY_API_URL ? JSON.stringify(process.env.PAYMENTSPRING_GATEWAY_API_URL) : 'https://whispering-cove-68110.herokuapp.com'
        }
      })
    ]
  }
}
