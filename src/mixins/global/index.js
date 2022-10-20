import camelCase from 'lodash/camelCase'
const requireMixins = require.context('.', false, /\.js$/)
const mixins = {}

requireMixins.keys().forEach(fileName => {
  if (fileName === './index.js') return
  const mixinName = camelCase(
    fileName.replace(/(\.\/|\.js)/g, '')
  )
  mixins[mixinName] = requireMixins(fileName).default
})
export default mixins
