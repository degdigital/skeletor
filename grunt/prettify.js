module.exports = {
    options: {
    	'indent': 4
    },
    all: {
	    expand: true,
	    cwd: '<%= paths.app.patterns %>',
	    ext: '.html',
	    src: ['*.html'],
	    dest: '<%= paths.app.patterns %>'
    }
};