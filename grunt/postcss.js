module.exports = {
    all: {
        options: {
            map: false,
            processors: [
                require("postcss-import")(),
                require("postcss-mixins")(),
                require("postcss-custom-properties")(),
                require("postcss-calc")(),
                require("postcss-color-function")(),
                require("postcss-nested")(),
                require("autoprefixer")({
                    browsers: 'last 2 versions'
                }),
                require('csswring')
            ]
        },
        files: [
            {
                expand: true,
                cwd: "<%= paths.src.css %>",
                src: ['*.css'],
                dest: "<%= paths.src.css %>",
                ext: '.css'
            }
        ]
    }
};