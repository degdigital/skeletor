module.exports = {
    css: {
        files: ["<%= paths.src.css %>/**/*.css"],
        tasks: ["sass_globbing","postcss"],
        options: {
            "spawn": true,
            event: ['changed', 'added', 'deleted']
        }
    },
    html: {
        files: [
            '<%= paths.src.patterns %>/**/*.mustache',
            '<%= paths.src.patterns %>/**/*.json',
            '<%= paths.src.css %>/**/*.css',
            '<%= paths.src.js %>/**/*.js',
            'source/_data/*.json'
        ],
        tasks: ['shell:patternlab'],
        // tasks: ['shell:patternlab','copy','prettify'],
        options: {
            "spawn": false,
            event: ['changed', 'added', 'deleted']
        }
    },
    apphtml: {
        files: [
            '<%= paths.app.patterns %>/**/*.html'
        ],
        tasks: ['prettify'],
        options: {
            "spawn": false
        }
    }
};