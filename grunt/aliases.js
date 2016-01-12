module.exports = function(grunt, options){
  var task = grunt.cli.tasks.length ? grunt.cli.tasks[0] : null;
  if(task && task.indexOf('deploy') == 0) {
    options.production = true;
    options.paths.dest = options.paths.export;
    options.urls.dest = options.urls.export;
    grunt.option('polyfills', true);
  } else {
    options.paths.dest = options.paths.public;
    options.urls.dest = options.urls.public;
  }

  return {
    "default": [
      "build-patterns",
      "build-css",
      "build-js",
      "build-assets"
    ],
    "build-patterns": [
      "shell:patterns"
    ],
    "build-css": [
      "sass_globbing",
      "postcss"
    ],
    "build-js": [
      "shell:js",
      "concat:js",
      "sync:js",
      "clean:js"
    ],
    "build-assets": [
      "sync:assets_images",
      "sync:assets_fonts",
      "sync:assets_api"
    ],
    "deploy": [
      "build-patterns",
      "copy:patterns",
      "prettify:patterns",
      "build-css",
      "build-js",      
      "build-assets"
    ]
  };
};