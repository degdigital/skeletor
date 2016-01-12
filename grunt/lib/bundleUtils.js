module.exports = {
	getBundleName: function(bundle) {
		return (bundle.name ? bundle.name : bundle.entry) + '-bundle';
	},

	getBundleFilepath: function(bundle, directory, polyfills) {
		var path = require('path');

		var bundleName = this.getBundleName(bundle);
		if(polyfills) {
			bundleName += '-' + polyfills.map(this.getPolyfillNameFromPath).join('-');
		}
		return path.join(directory, bundleName + '.js');
	},

	getPolyfillNameFromPath: function(polyfillPath) {
		var path = require('path');
		return path.basename(polyfillPath);
	}

}