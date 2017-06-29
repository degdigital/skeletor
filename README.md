# Skeletor: Bones & Build Tools
Skeletor is a [Grunt](http://gruntjs.com)-powered, [Pattern Lab](http://patternlab.io)-centric, highly-customizable web project boilerplate and build tool created by the [DEG](http://www.degdigital.com) UI team. Skeletor uses [PostCSS](http://postcss.org) for CSS processing and [JSPM](http://jspm.io)/[SystemJS](https://github.com/systemjs/systemjs) for Javascript package management, module bundling/loading, and transpilation.

* [Requirements](#requirements)
* [Installation Instructions](#installation-instructions)
* [Atomic Design & Pattern Lab](#atomic-design--pattern-lab)
* [Themes](#themes)
* [Directory Structure](#directory-structure)
* [Workflows](#workflows)
* [Configuration](#configuration)
* [Javascript Module Bundling](#javascript-module-bundling)
* [Local Server](#local-server)

## Requirements
* [NodeJS](https://nodejs.org) version 6.0+


## Installation Instructions
1. Clone the Skeletor git repository into your project's root directory or a subdirectory.
2. From the command line, type `npm install` to install all Node dependencies. You should also install grunt globally, if you haven't already.
3. If using JSPM: install JSPM globally, then type `jspm install` in the command line to install all JSPM dependencies. If asked to create a config.js file, type `Yes`.
4. From the command line, type `grunt` to generate your first Pattern Lab build.
5. From the command line, type `grunt serve` to launch Skeletor's included local server (optional).


## Atomic Design & Pattern Lab
Skeletor encourages the use of the [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design) methodology and comes preconfigured with Pattern Lab to help you create atomic design systems. Learn more about Atomic Design and Pattern Lab [here](http://patternlab.io). **Note**: Skeletor currently ships with version 1 of Pattern Lab. A future release will support Pattern Lab v2.

In Skeletor, all primary front-end development occurs in Pattern Lab. You can then export your code as a standalone site or into a CMS. Read more about this in the [workflows](#workflows) section.

## Themes
Skeletor is a multi-theme build tool. A theme is considered a variation of a base website or set of assets. In a multi-theme environment, you have a base theme (website) and one or more child themes that vary from the base theme in some way. Skeletor is configured for one theme by default but can easily be configured for multiple themes.

One benefit of using themes is the ability to have child themes inherit CSS, fonts, and images from the base theme. This avoids repetition of CSS code and assets while still allowing for overrides in a child theme when necessary.

## Directory Structure
Skeletor can be the entirety of your web project or live side-by-side with your CMS source directory, depending on your needs. The default directory structure is as follows:

```
skeletor
|-- export/
|   |-- css/
|   |-- images/
|   |-- js/
|   |-- patterns/
|-- grunt/
|-- public/
|   |-- css/
|   |-- images/
|   |-- js/
|   |-- patterns/
|-- source/
|   |-- _annotations/
|   |-- _data/
|   |-- _meta/
|   |-- _patterns/
|   |-- css/
|   |-- images/
|   |-- js/
|-- Gruntfile.js
|-- project-config.js
```

### Pattern Lab Directories
By default, Pattern Lab lives in the root of Skeletor. The `core/` and `config/` directories contain the Pattern Lab source code and configuration settings, respectively. The `source/` directory contains your project's source code, including pattern templates, CSS, JS, and images. The `public/` directory contains the generated Pattern Lab site. Assets are compiled and copied from the `source/` directory to the `public/` directory during the build process.

### Export Directory
The `export/` directory contains production-ready assets that have been exported from Pattern Lab. Depending on the configuration of your project, assets may bypass this directory and instead be exported into CMS directories.

### Grunt Directory
Skeletor is powered by the Grunt task runner. Task configuration and code files can be found in the `grunt` directory. However, the majority of your configuration changes should be confined to the `project-config.json` file.

### Multi-Theme Directory Structure
To use multiple themes with Skeletor, the directory structure changes slightly. A directory for each theme is added to the root directory of Skeletor. The assets for a theme live within the theme's directory. In addition, each theme has its own instance of Pattern Lab. This is due to the current limitations of representing multiple websites in a single instance of Pattern Lab.

An example of a multi-theme directory structure is below:
```
skeletor
|-- baseTheme/
|   |-- export/
|   |-- public/
|   |-- source/
|-- grunt/
|-- theme1/
|   |-- export/
|   |-- public/
|   |-- source/
|-- theme2/
|   |-- export/
|   |-- public/
|   |-- source/
|-- Gruntfile.js
|-- project-config.js
```

## Workflows
Skeletor supports two primary workflows: project development and exporting/CMS integration. Both workflows are controlled via the command line by invoking Grunt tasks.

### Project Development Workflow
Primary development occurs within Pattern Lab, specifically the source directory. UI assets such as patterns, CSS, Javascript, and images are processed, compiled, and copied to the public directory by invoking the build task `grunt build`. You can run the build task automatically when source files are created/modified by invoking the listen task: `grunt listen`.

### Exporting/CMS Integration Workflow
Pattern Lab outputs a static website. Depending on the nature of your project, this deliverable may be sufficient. In other cases, you may need to integrate your UI assets (HTML, CSS, JS, images, fonts, etc) into a production CMS. Either way, your UI assets are exported to directories of your choosing by invoking the export task `grunt export`.

### Multi-Theme Targeting
The `build`, `listen`, and `export` tasks are created as [multi tasks](http://gruntjs.com/creating-tasks#multi-tasks) in Grunt. When Skeletor is configured for multiple themes, it automatically creates targets for each of these multi tasks, one target per theme. This allows you to constrain the tasks to one theme by appending `:[themeName]` when running a task from the command line.

For example, to run the `build` task on theme1, you would type `grunt build:theme1` into the command line. To run the build task for all themes, simply omit the theme name postfix and type `grunt build`.

### Linting
Skeletor supports [ESLint](http://eslint.org/) for linting Javascript files. Linting occurs before transpilation and is based on the settings within `.eslintrc` in the root of Skeletor. By default, linting runs during both the `build` and `export` tasks (this setting is [configurable](#jslinterenable)). Linting can also be run independently using the `lint` or `lint-js` tasks.

## Configuration
Skeletor is built to be highly-configurable. The majority, if not all, of the configuration settings exist in the `project-config.js` file.

### Theme Configuration
The majority of Skeletor's configuration settings are contained within theme configuration objects. These objects live within the `themes` object in `project-config.js`. By default, Skeletor is configured for one theme:

```js
/* Themes configuration */
var themes = {
    /* Theme configuration */
    default: {
        basePath: '',
        ...
    }
};
```

For multiple themes, additional theme configuration objects can be included in the `themes` setting :

```js
/* An example of two themes that inherit from a base theme */
/* Themes configuration */
var themes = {

  /* Base theme configuration */
  baseTheme: {
    ...
  },

  /* Theme 1 configuration */
  theme1: {
    parentTheme: 'baseTheme',
    ...
  },

  /* Theme 2 configuration */
  theme2: {
    parentTheme: 'baseTheme',
    ...
  }
};
```

### Theme Defaults
Skeletor has a single theme configuration object that contains default theme settings. This object, called `themeDefaults` in the `project-config.js` file, gets merged with each theme configuration object in `themes`. This allows you to centralize common theme settings into one object while still retaining the ability to override certain settings in specific themes.

```js
  var themeDefaults = {
    css: {
      exportSourceFiles: false
    }
  };

  var themes = {
    theme1: {
      css: {
        /* Overrides the exportSourceFiles setting inherited from themeDefaults */
        exportSourceFiles: true
      }
    }
  }
```


### Theme Configuration
A theme configuration object contains settings for a particular theme.

#### General
```js
theme1: {
    basePath: 'theme1',
    parentTheme: 'baseTheme',
    ...
}
```

##### basePath
Type: `String`
The base filepath of the theme, relative to Skeletor's root directory. If this property is omitted, the base filepath defaults to the name of the theme itself.

##### parentTheme
Type: `String`
The name of the theme's parent theme. Setting a parent theme allows for CSS inheritance.

#### Asset Directories
There are three primary directories that your assets live in: `source/`, `public/`, and `export/` (see the [Directory Structure](#directory-structure) section for more information). The file paths and urls for these asset directories are pre-configured for you:

```js
/* Source directory configuration */
theme1: {
    'source': {
      basePath: 'source',
      assetPaths: {
        api: 'api',
        css: 'css',
        fonts: 'fonts',
        images: 'images',
        js: 'js',
        patterns: '_patterns',
        patternData: '_data'
      }
    },

    /* Public directory configuration */
    'public': {
      basePath: 'public',
      assetPaths: {
        api: 'api',
        css: 'css',
        fonts: 'fonts',
        images: 'images',
        js: 'js',
        patterns: 'patterns'
      },
      assetUrls: {
        js: '../../js'
      }
    },

    /* Export directory configuration */
    'export': {
      basePath: 'export',
      assetPaths: {
        api: 'api',
        css: 'css',
        fonts: 'fonts',
        images: 'images',
        js: 'js',
        patterns: ''
      },
      assetUrls: {
        js: 'js'
      }
    },
    ...
}
```
##### {assetDirectory}.basePath
Type: `String` Default: [assetDirectory]
The base file path of the asset directory relative to the theme's directory.

##### {assetDirectory}.assetPaths
Type: `Object`
The file paths of asset types (CSS, Javascript, images, etc) relative to the asset directory.

##### {assetDirectory}.assetUrls
Type: `Object`
The URLs of asset types relative to the web root. These settings currently only apply to the Javascript assets in the `public` and `export` asset directories.

#### CSS
Skeletor employs [PostCSS](http://postcss.org) to process your CSS files. There are several CSS configuration options available to you:

```js
theme1: {
    /* CSS processing configuration */
    css: {

        /* Export CSS source files along with compiled files */
        exportSourceFiles: false,

        /* CSS files to be processed */
        files: [
            {
                /* Destination file name */
                dest: "global.css",

                /* When to process file [all, build, export] */
                process: 'all'
            }
        ],

        /* PostCSS configuration */
        postcss: {

            /* Enable source maps */
            map: false,

            /* PostCSS processor configuration */
            processors: [
                { name: 'postcss-import'},
                { name: 'postcss-mixins' },
                { name: 'postcss-custom-properties'},
                { name: 'postcss-custom-media'},
                { name: 'postcss-calc'},
                { name: 'postcss-color-function'},
                { name: 'postcss-nested'},
                { name: 'autoprefixer'},
                { name: 'csswring'}
            ]
        }
    },
    ...
}
```

##### css.exportSourceFiles
Type: `Boolean` Default: `false`
In addition to the processed CSS files, source CSS files are copied to the export directory during an export.

##### css.files
Type: `Array`
A list of processed CSS file configuration objects.

##### file.dest
Type: `String`
The destination filename of the processed CSS file.

##### file.process
Type: `String` Default: `all`
Specifies when the CSS file should be processed. Possible values include `all`, `build`, and `export`.

##### css.postcss
Type: `Object`
Configuration settings for PostCSS.

##### postcss.map
Type: `Boolean` Default: `false`
Enable PostCSS source maps

##### postcss.processors
Type: `Array`
A list of PostCSS processor configuration objects

##### processor.name
Type: `String`
The name of the PostCSS processor

##### processor.options
Type: `Object`
The options for the PostCSS processor

#### Images
Skeletor will copy image files from the `source` directory to the `public` and `export` directories based on the following configuration settings defined in `project-config.js`.

```js
/* Image processing configuration */
images: {

    /* Image files to be processed */
    files: [
        {
            /* When to process file [all, build, export] */
            process: 'all',

            /* Files and directories to be processed */
            src: '**/*'
        },
        {
            /* Exclude images in the samples directory during an export */
            process: 'export',
            src: ['!**/samples/**']
        }
    ]
}
```

##### images.files
Type: `Array`
A list of image file configuration objects.

##### file.process
Type: `String` Default: `all`
Specifies when the image files should be copied. Possible values include `all`, `build`, and `export`.

##### file.src
Type: `String`
Specifies the files/directories to be copied.

#### Javascript
By default, Skeletor uses [JSPM](http://jspm.io) as a Javascript package manager, module bundler, module loader, and transpiler. There are several Javascript configuration options available to you in `project-config.js`:

```js
/* Javascript Configuration */
theme1: {
    js: {

        /* Enable Javascript Linting [all, build, export] */
        linter: {
            enable: 'all'
        },

        /* Javscript Processor Configuration */
        processors: [
            {
                /* Processor type [jspm, none] */
                type: 'jspm',

                /* When to minify Javascript [all, build, export] */
                minify: 'export',

                /* Enable module bundling for use with JSPM [true, false] */
                enableBundling: true,

                /* Module bundle config for JSPM */
                bundles: {
                    /* Name of module to exclude from all other bundles */
                    defaultExclude: 'main',

                    /* Build self-executing bundles [true, false] */
                    selfExecuting: false,

                    /* Array of module bundles config objects */
                    items: [
                        {
                            /* Name of this bundle (optional) */
                            name: 'main',

                            /* Name of entry module for this bundle */
                            entry: 'main',

                            /* Array of modules to exclude from this bundle */
                            exclude: [],

                            /* Array of polyfills for this bundle */
                            polyfills: []
                        },
                        {
                            /* Name of this bundle (optional) */
                            name: 'home',

                           /* Name of entry module for this bundle */
                            entry: 'home',

                            /* Array of modules to exclude from this bundle */
                            exclude: [],

                            /* Array of polyfills for this bundle */
                            polyfills: []
                        }
                    ]
                }
            }
        ]
    },
    ...
}
```

##### js.linter.enable
Type: `String` Default: `all`
Specifies when Javascript linting should take place. Possible values include `all`, `build` and `export`. A value of `all` will result in Javascript linting during both the `build` and `export` tasks.

##### js.processors
Type: `Array`
An array of one or more Javascript processors to be used. Most projects will only require one processor, but multiple are allowed.

##### processor.type
Type: `String` Default: `jspm`
Specifies the type of Javascript processor. Possible values include `jspm` and `none`. A value of `none` will result in straight copy of the source Javascript files to the public and export directories.

##### processor.minify
Type: `String` Default: `export`
Specifies when Javascript files should be minified. Possible values include `all`, `build`, `export`, and `none`.

##### processor.enableBundling
Type: `Boolean` Default: `true`
Specifies whether Javascript modules should be bundled during the development workflow. If set to false, Javascript modules will be copied directly to the public directory and loaded individually by the SystemJS module loader. This can facilitate quicker Javascript processing (as bundling can take several seconds) and easier debugging. This setting does not apply to the export workflow, during which bundling is always enabled.

##### processor.bundles
Type: `Object`
Configuration settings for JSPM module bundling. See the [Javascript Module Bundling](#javascript-module-bundling) section for more information.

##### processor.bundles.defaultExclude
Type: `string`
The name of the bundle to exclude from all other bundles. This setting can be useful when you have a common bundle that loads on every page.

##### processor.bundles.selfExecuting
Type: `Boolean` Default: `false`
Specifies whether or not to create self-executing bundles that are independent of the SystemJS module loader.

##### processor.bundles.items
Type: `Array`
A list of module bundle configuration objects.

##### bundle.entry
Type: `String`
The name of the module that serves as the entry point for the bundle. The bundle will include this module and all of its dependencies.

##### bundle.name
Type: `String` Default: ``
The name of this bundle. This setting is optional and, if omitted, the bundle name will default to the name of the entry module.

##### bundle.exclude
Type: `Array`
A list of bundle names to exclude from this bundle. These should be "full" bundle names, meaning they should include the postfix `-bundle`

##### bundle.polyfills
Type: `Array`
A list of polyfills to apply to this bundle. Each item in this setting is a file path to a polyfill script relative to the Javascript root directory. See the [Polyfilled Bundles](#polyfilled-bundles) section for more information.

### Listen Task Configuration
By default, the `listen` task will watch for asset file changes and run a `build` task when changes occur. This behavior is configurable:

##### listenTasks
Type: `Array` Default: '[build]'
The task(s) that the `listen` task will run when file changes occur. Possible values include `build` and `export`.


## Javascript Module Bundling
Skeletor will generate module bundles for you based on the `bundles` configuration setting in `project-config.js`. Under the hood, Skeletor will iterate through your defined bundles and execute 'jspm bundle' commands on each. These bundles can either be standard SystemJS bundles or stand-alone, self-executing bundles (as specified in the `bundles.selfExecuting` setting).

Skeletor is configured to create SystemJS bundles by default. SystemJS bundles are not referenced in a web page directly, but rather by an entry module within it:

```html
<!-- Load the SystemJS script and its configuration file -->
<script src="../../js/jspm_packages/system.js"></script>
<script src="../../js/config.js"></script>
<script>
    <!-- Tell SystemJS to import the 'main' module, which will cause the 'main-bundle' bundle to be loaded -->
  System.import('main');
</script>
```

If you instead choose to use self-executing bundles independent of the SystemJS module loader, the method for loading a bundle is slightly different:

```html
<!-- Load the bundleHelper file -->
<script src="../../js/bundleHelper.js"></script>
<script>
    <!-- Use bundleHelper to load the 'main-bundle' bundle -->
  bundleHelper.loadBundle('main-bundle');
</script>
```

Skeletor generates polyfill/bundle combinations and loads the correct combination based on client-side feature testing (see the [Polyfilled Bundles](#polyfilled-bundles) section below). In order for Skeletor to accomplish this, self-executing bundles need to be loaded via `bundleHelper`, which is included in Skeletor.

### Polyfilled Bundles

#### Overview
In many cases, your code will require certain Javascript API polyfills in order to run correctly on legacy (or even modern) browsers. For delivering these polyfills to the client, Skeletor takes the conditional-build approach recommended by the [yepnope.js](https://github.com/SlexAxton/yepnope.js#deprecation-notice) team and others. At runtime, this approach includes the following steps:
1. Run a series of feature tests on the client's browser
2. Generate a bundle filename based on the results of the feature tests (i.e., append the names of the failed tests to the bundle's filename)
3. Load the bundle from the server using this generated filename, which will include the appropriate feature polyfills

#### Generating Conditional Builds
At build time, Skeletor uses the `bundle.polyfills` setting in each bundle configuration to generate conditional builds of those bundles. Each conditional build is a combination of polyfills concatenated to the beginning of a bundle. For example, say you have a bundle called `main-bundle` that has two polyfills specified:
```js
bundles: {
    ...,
    items: [
        {
            entry: 'main',
            polyfills: ['polyfills/classList', 'polyfills/assign']
        }
    ]
}
```
Skeletor will generate four versions of the `main-bundle` bundle, one for each potential combination of polyfills needed by a client browser:
* `main-bundle.js` (bundle without any polyfills)
* `main-bundle-classList.js` (bundle with the `classList` polyfill)
* `main-bundle-assign.js` (bundle with the `assign` polyfills)
* `main-bundle-classList-assign.js` (bundle with the `classList` and `assign` polyfills)

#### Loading a Conditional Build
Skeletor contains a `bundleHelper.js` script that is responsible for performing feature tests on the client browser and then loading the correct polyfill/bundle combination based on the results of those tests. A `polyfillTests.js` file contains the polyfill test definitions that bundleHelper will use.  You can see a sample `polyfillTests.js` file below:
```js
var polyfillTests = {

  /* Test for Element.closest() method */
  closest: function() {
    return typeof Element.prototype.closest === 'function';
  },

  /* Test for Object.assign() method */
  assign: function() {
    return typeof Object.assign == 'function';
  }
}
```
A feature test definition is function that returns `true` if the test passes and `false` if the test fails. The name of the test function should match the filename of the associated polyfill script, which lives in the `js/polyfills/` directory.

The bundleHelper script contains an empty array variable called `bundles`:
```js
var bundleHelper = function() {
  ...
  var bundles = [],
  ...
}
```
At build time, this `bundles` array gets populated with bundle objects, one for each bundle defined in the `js.bundles.items` configuration setting in `project-config.js`. These bundle objects contain information about the feature tests needed for each bundle. These feature tests are references to the `testDefs` object.

At runtime, the bundleHelper script will iterate through each bundle object and run the specified feature tests on the client's browser. The script will then generate a bundle filename based on the failed feature tests. The final step is to intercept the loading of the bundle by the client browser and instead load the conditional build of the bundle.
* If you are using SystemJS bundles, the [SystemJS map configuration option](https://github.com/systemjs/systemjs/blob/master/docs/config-api.md#map) is used to tell the module loader to load the conditional build of the bundle rather than the default build
* If you are using self-executing bundles, SystemJS's map option isn't available. Instead, the bundleHelper script provides a `loadBundle` method that accepts a bundle name and loads the conditional build of the bundle.

The `bundleHelper.js` and `polyfillTests.js` files are automatically concatenated to the SystemJS `config.js` file during builds and exports. If you are using self-executing bundles, you will instead need to load the `bundleHelper.js` script directly and then load bundles using the `bundleHelper.loadBundle` method.

#### Adding Polyfills
Adding a new polyfill to your project is a three-step process:
1. Add the polyfill script to the `js/polyfills/` directory
2. Add the polyfill test to the `polyfillTests` object in the `polyfillTests.js` script as a function. Make sure the test function name matches the filename (minus the `.js` extension) of your polyfill script
3. Add a reference to the polyfill in the appropriate `bundle.polyfills` setting in `project-config.js`


## Local Server
Skeletor contains its own [Express](https://expressjs.com/)-based local server. Using the included server is convenient, but is not required (other local server software such as MAMP should also work fine). To launch, type `grunt serve`. By default, the Skeletor server will launch and automatically open a new browser window on the closest available port number to 9000 (i.e. `http://localhost:9000` or `http://localhost:9001` if port 9000 is already in use). 

The included server also allows you to write middleware, which can be very useful for manipulating HTTP responses (for example, when simulating REST endpoints). For detailed instructions on adding middleware, visit the grunt-contrib-connect [middleware documentation](https://github.com/gruntjs/grunt-contrib-connect#middleware).
