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

    /* Deploy aliases */
    "deploy": [
      "deploy-patterns",      
      "deploy-css",
      "deploy-js",      
      "deploy-images",
      "deploy-fonts",
      "deploy-api"
    ],
    "deploy-patterns": [
      "build-patterns",
      "copy:patterns",
      "prettify:patterns",
    ],
    "deploy-css": [
      "build-css",
      "sync:css"
    ],
    "deploy-js-jspm": [
      "build-js",
      "sync:js-jspm_bundle-deploy",
      "string-replace:js-jspm_bundle-deploy"
    ],
    "deploy-js-raw": [
      "build-js",
      "sync:js-raw_deploy"
    ],
    "deploy-images": [
      "sync:assets_images-deploy"
    ],
    "deploy-fonts": [
      "sync:assets_fonts-deploy"
    ],
    "deploy-api": [
      "sync:assets_api-deploy"
    ]   
  };
};