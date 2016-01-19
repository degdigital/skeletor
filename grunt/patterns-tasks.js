module.exports = {
	shell: {
		options: {
  			stdout: true
  		},
  		command: 'php core/builder.php -gp'
	},
	copy: {
		"files": [{
	        "expand": true,
	        "cwd": "<%= paths.public.patterns %>",
	        "src": ["**/*-pages-*.html", "!**/*-pages-*.escaped.html"],
	        "dest": "<%= paths.export.patterns %>/",
	        "flatten": true,
	        "filter": 'isFile',
	        "rename": function(dest, src) {
	            return dest + src.substr(12);
	        }
	    }],
	    "options": {
	        "process": function (content, srcpath) {
	            return content.replace(/<!-- Begin Pattern Lab -->[\s\S]*<!-- End Pattern Lab -->/ig, "")
	                          .replace(/<!-- Begin Pattern Lab JS -->[\s\S]*<!-- End Pattern Lab JS -->/ig, "")
	                          .replace(/\.\.\/\.\.\//g, "")
                              .replace(/\.css\?[0-9]*/g,".css")
                              .replace('<link rel="stylesheet" href="css/styleguide.css">', "");
	        }
	    }
	},
	prettify: {
		options: {
	    	'indent': 4
	    },
	    all: {
		    expand: true,
		    cwd: '<%= paths.export.patterns %>',
		    ext: '.html',
		    src: ['*.html'],
		    dest: '<%= paths.export.patterns %>'
	    }
	},
	watch: {
		files: [
            '<%= paths.source.patterns %>/**/*.mustache',
            '<%= paths.source.patterns %>/**/*.json',
            'source/_data/*.json'
        ],
        tasks: ['<%= watchTask %>-patterns'],
        options: {
            "spawn": false,
            event: ['changed', 'added', 'deleted']
        }
	}
}