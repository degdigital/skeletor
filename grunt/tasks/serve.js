module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.config.merge({
		connect: {
			server: {
				options: {
					base: 'public',
					hostname: '*',
					keepalive: true,
					middleware: function(connect, options, middlewares) {
						middlewares.unshift(function(req, res, next) {
							// console.log(req);
							// console.log(res);
							next();
          				});
						return middlewares;
					},
					open: true,
					port: 9000,
					protocol: 'http',
					useAvailablePort: true
				}
			}
	  	}
	});

	grunt.registerTask('serve', function() {
		grunt.task.run('connect');
	});

}
