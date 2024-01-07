require('ts-node').register({ 
  compilerOptions: { 
    module: 'commonjs' 
  } 
})

module.exports = {
  plugins: {
    tailwindcss: require('./tailwind.config'),
    autoprefixer: {},
  },
}