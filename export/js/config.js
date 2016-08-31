System.config({
  baseURL: "js",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "main-bundle.js": [
      "main.js"
    ]
  },

  map: {
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.7",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});

var bundleHelper = function() {
	/* Add your polyfill test definitions here */
	var testDefs = {
		assign: Object.assign,
		fetch: self.fetch,
		find: Array.prototype.find
	}

	var bundles = [{filename: 'main-bundle.js',tests:[]}],
		map = {},
		baseURL = "js";

	function init() {
		if(typeof System != 'undefined' && System.config) {
			baseURL = System.baseURL;
			mapPolyfilledBundles();
		}
	}

	function mapPolyfilledBundles() {
		for(var i = 0; i < bundles.length; i++) {
			mapPolyfilledBundle(bundles[i]);	
		}
		System.config({ map: map });
	}

	function mapPolyfilledBundle(bundle) {
		var polyfilledBundleFilename = buildPolyfilledBundleFilename(bundle);
		map[bundle.filename] = polyfilledBundleFilename;
	}

	function getBundle(filename) {
		for(var i = 0; i < bundles.length; i++) {
			if(bundles[i].filename === filename) {
				return bundles[i];
			}
		} 
		return null;
	}

	function buildPolyfilledBundleFilename(bundle) {
		var filename = bundle.filename.replace(/\.js$/, '');			

		for(var i = 0; i < bundle.tests.length; i++) {
			var testName = bundle.tests[i];
			var testDef = testDefs[testName];
			if(testDef)
				continue;
			
			filename += '-' + testName;
		}

		return filename + '.js'
	}

	function injectScriptReference(src){
	    var js, 
	    	fjs = document.getElementsByTagName('script')[0],
	    	id = src.replace('/', '').replace(/[^\w\s]/gi, '');
	    if (document.getElementById(id)){ return; }
	    js = document.createElement('script'); js.id = id;
	    js.onload = function(){
	        // remote script has loaded
	    };
	    js.src = src;
	    fjs.parentNode.insertBefore(js, fjs);
	}

	function loadBundle(filename) {
		if(filename.lastIndexOf('.js', filename.length - 3) === -1) {
			filename += '.js';
		}
		var bundle = getBundle(filename);
		if(bundle) {
			var polyfilledFilename = buildPolyfilledBundleFilename(bundle);
			var src = baseURL + '/' + polyfilledFilename;
			injectScriptReference(src);
		}
	}

	function setBaseURL(newBaseURL) {
		baseURL = newBaseURL;
	}

	init();

	return {
		loadBundle: loadBundle,
		setBaseURL: setBaseURL
	}
}();
