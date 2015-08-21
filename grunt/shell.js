module.exports = {
	patternlab: {
		options: {
			stdout: true
		},
		command: 'php core/builder.php -g'
	},
	'jspm-bundle': {
	  	options: {
	      stdout: true
	    },
	    command: 'jspm bundle app source/js/common-bundle.js --inject'
	},
	'jspm-unbundle': {
	  	options: {
	      stdout: true
	    },
	    command: 'jspm unbundle'
	}
};