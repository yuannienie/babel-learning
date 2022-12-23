const { transformFileSync } = require('@babel/core');
const autoLoggerPlugin = require('./plugin');
const path = require('path');
const fs = require('fs');

const transformed = transformFileSync(path.join(__dirname, './source-code.js'), {
  plugins: [[autoLoggerPlugin, {
    moduleName: 'logger'
  }]],
  parserOpts: {
    sourceType: 'unambiguous',
    plugins: ['jsx']
  }
})

console.log(transformed.code);
try {
  fs.writeFileSync(path.join(__dirname, './source-code-transformed.js'), transformed.code);
} catch {
  console.error('write failed');
}