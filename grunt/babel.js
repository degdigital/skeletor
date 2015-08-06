module.exports = {
    options: {
        filenameRelative: 'source/js/src',
        modules: 'system',
        moduleIds: true,
        moduleRoot: '',
        sourceMap: false,
        sourceRoot: 'source/js/src'
    },
    dist: {
        files: [
            {
                expand: true,
                cwd: "<%= paths.src.js %>",
                src: [
                    '**/*.js'
                ],
                dest: "<%= paths.trans.js %>",
                ext: '.js'
            }
        ]
    }
};