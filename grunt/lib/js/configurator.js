module.exports = function(grunt, options) {

	function isExport() {
    	var task = grunt.cli.tasks.length ? grunt.cli.tasks[0] : '';
		return task.indexOf('export') == 0;
    }

	function verifyEnableBundlingSetting() {
		if(isExport() || grunt.option('bundle-js')) {
	        options.js.enableBundling = true;
	    }
	}

    function setMinifyJsOption() {
    	var minifyJS = false;
		switch(options.js.minify) {
			case "always":
				minifyJS = true;
				break;
			case "exportOnly": 
				minifyJS = isExport();
				break;
		}
	    grunt.option('minifyJS', minifyJS);
    }

    function configure() {
    	verifyEnableBundlingSetting();
    	setMinifyJsOption();
    }

    return {
    	configure: configure
    }

};