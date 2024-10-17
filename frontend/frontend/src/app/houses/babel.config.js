module.exports = {
    presets: [
      '@babel/preset-env', // For transforming modern JavaScript (ES6+)
      '@babel/preset-typescript', // For transforming TypeScript files
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs', // Transforms ES modules to CommonJS for Jest
    ],
  };