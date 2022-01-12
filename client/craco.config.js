
const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@': resolvePath('./src'),
            '@assets': resolvePath('./src/assets'),
            '@components': resolvePath('./src/components'),
            '@styles': resolvePath('./src/styles'),
            '@types': resolvePath('./src/types'),
            "@utils": resolvePath('./src/utils'),
            '@pages': resolvePath('./src/pages'),
            "@services": resolvePath('./src/services'),
            '@cache': resolvePath('./src/cache'),
            "@hooks": resolvePath('./src/hooks'),
            "@constants": resolvePath('./src/constants')
        }
    },
}