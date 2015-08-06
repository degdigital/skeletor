module.exports = {
    app: {
        files: {
            '<%= paths.dist.js %>/picturefill.js': [
                '<%= paths.src.js %>/polyfills/picturefill.js',
                '<%= paths.src.js %>/polyfills/picturefill-geckofix.js'
            ],
            '<%= paths.dist.js %>/commonBundle.js': [
                '<%= paths.trans.js %>/app.js'
            ]
        }
    },
    options: {
        beautify: true,
        compress: {
            drop_console: false
        },
        mangle: false
    }
};