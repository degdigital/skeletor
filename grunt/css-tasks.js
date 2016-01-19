module.exports = function(grunt, options) {
	return {
		'sass_globbing': {
			"files": {
		        "<%= paths.public.css %>/global.css": [
	    			"<%= paths.source.css %>/utilities/**/*.css",
	    			"<%= paths.source.css %>/atoms/**/*.css",	    			
	    			"<%= paths.source.css %>/molecules/**/*.css",
	    			"<%= paths.source.css %>/organisms/**/*.css",
	    			"<%= paths.source.css %>/templates/**/*.css"
	    		]
		   	}	    
		},
		postcss: {
			options: {
	            map: false,
	            processors: [
	                require("postcss-import")(),
	                require("postcss-mixins")(),
	                require("postcss-custom-properties")(),
	                require("postcss-custom-media")(),
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
	                cwd: options.paths.public.css,
	                src: ['*.css'],
	                dest: options.paths.public.css,
	                ext: '.css'
	            }
	        ]
		},
		sync: {
			files: [{
			  cwd: '<%= paths.public.css %>',
			  src: '*.css',
			  dest: '<%= paths.export.css %>'
			}],
			updateAndDelete:true,
			verbose: true
		},
		watch: {
			files: ["<%= paths.source.css %>/**/*.css"],
	        tasks: ['<%= watchTask %>-css'],
	        options: {
	            "spawn": true,
	            event: ['changed', 'added', 'deleted']
	        }
		}
	};
}