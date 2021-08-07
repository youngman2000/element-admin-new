const name = 'vue element admin'
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    runtimeCompiler: true,
    lintOnSave: process.env.NODE_ENV === 'development',
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/')
            }
        }
    },
    chainWebpack(config) {
        config.plugins.delete('prefetch')
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

    },

}
