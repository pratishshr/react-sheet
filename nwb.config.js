module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'hagrid',
      externals: {
        react: 'React'
      }
    }
  }
}
