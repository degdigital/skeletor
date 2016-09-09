var bundleHelper = function() {

	var bundles = [],
		map = {},
		baseURL = "<%= jsUrl %>";

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
			var testDef = polyfillTests[testName];
			if(testDef())
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
