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
    "babel": "npm:babel-core@5.8.22",
    "babel-runtime": "npm:babel-runtime@5.8.20",
    "core-js": "npm:core-js@0.9.18",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.8.20": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

var testDefs = {
	assign: Object.assign,
	fetch: self.fetch,
	find: Array.prototype.find
}

var bundles = [],
map = {};

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

mapPolyfilledBundles();