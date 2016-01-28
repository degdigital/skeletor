# Skeletor
The DEG UI team's project boilerplate, preconfigured for Pattern Lab, PostCSS and JSPM/Babel.

![Skeletor](https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11378223_919327878090231_1165808606_n.jpg "Skeletor")

## Installation Instructions
1. In your terminal, navigate to your project's root directory.
2. Type `mkdir ui && cd $_` to create a new UI directory and navigate into it.
3. Type `git clone https://github.com/degdigital/skeletor.git . && rm -rf .git` *(Note: make sure you're cloning into an empty directory or it will fail.)*
3. Type `npm install` to install all Node dependencies.
4. Type `grunt` to create your first Pattern Lab build.
5. *Optional:* type `grunt watch` to watch for changes to your new project.

## Installing [DEGJS](http://github.com/DEGJS) Modules
1. In your terminal, navigate to your newly created UI folder.
2. Type `jspm install github:DEGJS/modulename`, with "modulename" corresponding to the name of the repo (i.e., `jspm install github:DEGJS/breakpoints` for the [breakpoints](http://github.com/DEGJS/breakpoints) module). The module and all of its dependencies will be automatically downloaded and configured in your project.
3. You can now use the newly installed module by adding `import modulename from "DEGJS/modulename";` at the top of any of your JavaScript files.
4. This technique will also work for other JSPM-formatted modules, including the ones hosted in the main [JSPM Registry](http://kasperlewau.github.io/registry/#/).

## JavaScript Bundles
### Development
System.js/JSPM includes a runtime Babel transpiler. There's no need to compile your bundles during development, and no JS bundling/minification/concatenation takes place during a `grunt` or `grunt watch` task.

### Configuring
Define your bundles in `Gruntfile.js`. There you will find a `bundles` object, which has an `items` property that is an array of bundle configurations. Each bundle configuration takes the following form:
```
{
  entry: 'home', //Main entry point of bundle
  name: 'home-bundle', //Name of bundle. This property is optional and will default to [entry]-bundle if omitted
  exclude: 'main-bundle' //Bundle name or array of bundle names to be excluded from bundle. This property is optional and will override defaultExclude 
}
```
The `bundles` object also can contain a `defaultExclude` property, which is a bundle name or an array of bundle names to exclude from each bundle configuration.

### Exporting
When you're ready to bundle and export your code for production, type `grunt export`, which creates your minified JS bundles and copies them to the Export directory.
