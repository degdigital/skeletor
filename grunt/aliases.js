module.exports = function(grunt, options){
  return {
    "default": "build",

    /* Build aliases */
    "build": [
      "build-patterns",
      "build-css",
      "build-js",
      "build-images",
      "build-fonts",
      "build-api"
    ],
    "build-patterns": [
      "shell:patterns"
    ],
    "build-css": [
      "sass_globbing",
      "postcss"
    ],
    "build-js-raw": [
      "sync:js-raw_dev"
    ],
    "build-js-jspm-bundled": [
      "shell:js-jspm_bundle",     
      "sync:js-jspm_bundle-dev",
      "concat:js-jspm_bundle",
      "string-replace:js-jspm_bundle-dev",
      "clean:js-jspm_bundle"
    ],
    "build-js-jspm-raw": [
      "shell:js-jspm_unbundle",
      "sync:js-jspm_raw-dev"
    ],
    "build-images": [
      "sync:assets_images-dev"
    ],
    "build-fonts": [
      "sync:assets_fonts-dev"
    ],
    "build-api": [
      "sync:assets_api-dev"
    ],

    /* export aliases */
    "export": [
      "export-patterns",      
      "export-css",
      "export-js",      
      "export-images",
      "export-fonts",
      "export-api"
    ],
    "export-patterns": [
      "build-patterns",
      "copy:patterns",
      "prettify:patterns",
    ],
    "export-css": [
      "build-css",
      "sync:css"
    ],
    "export-js-jspm": [
      "build-js",
      "sync:js-jspm_bundle-export",
      "string-replace:js-jspm_bundle-export"
    ],
    "export-js-raw": [
      "build-js",
      "sync:js-raw_export"
    ],
    "export-images": [
      "sync:assets_images-export"
    ],
    "export-fonts": [
      "sync:assets_fonts-export"
    ],
    "export-api": [
      "sync:assets_api-export"
    ]   
  };
};