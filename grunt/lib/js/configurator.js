module.exports = function(grunt, options) {

	function isDeployment() {
    	var task = grunt.cli.tasks.length ? grunt.cli.tasks[0] : '';
		return task.indexOf('deploy') == 0;
    }

	function verifyEnableBundlingSetting() {
		if(isDeployment() || grunt.option('bundle-js')) {
	        options.js.enableBundling = true;
	    }
	}

    function setMinifyJsOption() {
    	var minifyJS = false;
		switch(options.js.minify) {
			case "always":
				minifyJS = true;
				break;
			case "deployOnly": 
				minifyJS = isDeployment();
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