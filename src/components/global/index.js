const files = require.context('.', false, /\.vue$/)
const component = {}

files.keys().forEach(key => {
  component[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

export default component
