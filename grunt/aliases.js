module.exports = function(grunt, options){
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
    "build-js-bundled": [
      "shell:js-bundled",
      "concat:js-bundled",
      "sync:js-bundled",
      "clean:js-bundled"
    ],
    "build-js-raw": [
      "shell:js-raw",
      "sync:js-raw"
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