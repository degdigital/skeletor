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
    "babel": "npm:babel-core@5.8.35",
    "babel-runtime": "npm:babel-runtime@5.8.35",
    "core-js": "npm:core-js@1.2.6",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.35": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
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

	init();

	return {
		loadBundle: loadBundle
	}
}();
