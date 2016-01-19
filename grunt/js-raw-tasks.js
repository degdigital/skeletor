module.exports = function(grunt, options){
	return {
		'sync__dev': {
	    	files: [{
			  cwd: '<%= paths.source.js %>',
			  src: '**/*.js',
			  dest: '<%= paths.public.js %>'
			}],
			updateAndDelete:true,
			verbose: true
	    },	
	    'sync__deploy': {
	    	files: [{
			  cwd: '<%= paths.public.js %>',
			  src: '**/*.js',
			  dest: '<%= paths.export.js %>'
			}],
			updateAndDelete:true,
			verbose: true
	    }	
	};
};