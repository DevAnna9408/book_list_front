module.exports = {
  lintOnSave: false,

  outputDir: 'dist',

  runtimeCompiler: true,

  configureWebpack: {
    devtool: 'source-map'
  },

  pluginOptions: {
    i18n: {
      locale: 'ko',
      fallbackLocale: 'ko',
      localeDir: 'assets/lang/general',
      enableInSFC: true
    }
  }
}
