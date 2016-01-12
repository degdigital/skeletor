module.exports = {
	sync__images: {
		files: [{
		  cwd: '<%= paths.source.images %>',
		  src: [
		    '**/*'
		  ],
		  dest: '<%= paths.dest.images %>'
		}],
		updateAndDelete:true,
		verbose: true
	},
	sync__fonts: {
		files: [{
		  cwd: '<%= paths.source.fonts %>',
		  src: [
		    '**/*'
		  ],
		  dest: '<%= paths.dest.fonts %>'
		}],
		updateAndDelete:true,
		verbose: true
	},
	sync__api: {
		files: [{
		  cwd: '<%= paths.source.api %>',
		  src: [
		    '**/*.json'
		  ],
		  dest: '<%= paths.dest.api %>'
		}],
		updateAndDelete:true,
		verbose: true
	},
	watch__images: {
        files: [
            "<%= paths.source.images %>/**/*"
            ],
        tasks: ["sync:assets_images"],
        options: {
            "spawn": true,
            event: ['changed', 'added', 'deleted']
        }
    },
    watch__fonts: {
        files: [
            "<%= paths.source.fonts %>/**/*"
            ],
        tasks: ["sync:assets_fonts"],
        options: {
            "spawn": true,
            event: ['changed', 'added', 'deleted']
        }
    },
    watch__api: {
        files: [
            "<%= paths.source.api %>/**/*.json"
            ],
        tasks: ["sync:assets_api"],
        options: {
            "spawn": true,
            event: ['changed', 'added', 'deleted']
        }
    }
};