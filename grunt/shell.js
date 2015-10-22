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
	    command: 'jspm bundle main source/js/main-bundle.js --inject'
	  },
	  'jspm-unbundle': {
	  	options: {
	      stdout: true
	    },
	    command: 'jspm unbundle'
	  }
};