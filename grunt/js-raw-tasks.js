module.exports = function(grunt, options){
	return {
		shell: {
	    	options: {
	        stdout: true
	      },
	      command: 'jspm unbundle'     
	    },	    
	    sync: {
	    	files: [{
			  cwd: '<%= paths.source.js %>',
			  src: [
			  	'**/*.js',
			  	'!map-polyfills.js'
			  ],
			  dest: '<%= paths.dest.js %>'
			}],
			ignoreInDest: '**/*-bundle-*.js',
			updateAndDelete:true,
			verbose: true
	    }
	};
};