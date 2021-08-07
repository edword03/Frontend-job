// const path = require('path');

// module.exports = {
//   resolve: {
//     extensions: ['js', 'ts'],
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//       '@assets': path.resolve(__dirname, 'src/components'),
//       '@components': path.resolve(__dirname, 'src/components'),
//       '@styles': path.resolve(__dirname, 'src/styles'),
//       '@utils': path.resolve(__dirname, 'src/utils'),
//       // ...etc
//     },
//   },
// }

const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    // ...
    webpack: {
        alias: {
            '@': resolvePath('./src'),
            '@assets': resolvePath('./src/assets'),
            '@components': resolvePath('./src/components'),
            '@styles': resolvePath('./src/styles'),
            '@types': resolvePath('./src/types'),
            "@utils": resolvePath('./src/utils'),
            '@pages': resolvePath('./src/pages'),
            "@services": resolvePath('./src/services')
        }
    },
  // ...
}