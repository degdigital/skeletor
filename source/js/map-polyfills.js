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