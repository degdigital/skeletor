module.exports = function(grunt, activeTheme, processorOptions, parentTask) {
    function runTasks(){

        if(processorOptions.enableBundling || parentTask == 'export') {
            runBundleTasks();
        } else {
            runUnbundleTasks();
        }
    }

    function runUnbundleTasks() {
        runShellUnbundleTask();         

        grunt.task.run('sync:js_build_jspm_unbundled');
        grunt.task.run('string-replace:js_build_jspm_config');
    }

    function runShellUnbundleTask() {
        var shellBundleCommandBuilder = require('../../lib/jspm/shell-bundle-command-builder')(activeTheme, processorOptions);
        grunt.config('shell.js_build_jspm_unbundle.command', shellBundleCommandBuilder.buildUnbundleCommands());
        grunt.task.run('shell:js_build_jspm_unbundle');
    }

    function runBundleTasks() {
        const bundles = getBundlesToBuild();

        runShellBundleTask(bundles);

        if(processorOptions.bundles.selfExecuting) {
            grunt.task.run('sync:js_' + parentTask + '_jspm_bundled_sfx');                                  
            grunt.task.run('concat:js_' + parentTask + '_jspm_bundleHelper');
        } else {
            grunt.task.run('sync:js_' + parentTask + '_jspm_bundled');
            grunt.task.run('concat:js_' + parentTask + '_jspm_config');
        }

        runConcatBundlePolyfillsTask(bundles);

        if(processorOptions.bundles.selfExecuting) {
                runStringReplaceTask('js_' + parentTask + '_jspm_bundleHelper');
        } else {
                runStringReplaceTask('js_' + parentTask + '_jspm_config');      
        }

        grunt.task.run('clean:js_jspm_bundles');
        if (grunt.option('minifyJS')) {
            grunt.task.run('uglify:js_' + parentTask + '_jspm_bundled');
        }

    }

    function runShellBundleTask(bundles) {
        const shellBundleCommandBuilder = require('../../lib/jspm/shell-bundle-command-builder')(activeTheme, processorOptions);
        
        const bundleNames = bundles.reduce(function(accum, bundle) {
            const bundleName = bundle.entry + '-bundle.js';
            return accum === '' ? bundleName : accum + ', ' + bundleName; 
        }, '');

        console.log('Building bundle(s): ' + bundleNames);

        const bundleCommands = shellBundleCommandBuilder.buildBundleCommands(bundles);
       
        grunt.config('shell.js_' + parentTask + '_jspm_bundle.command', bundleCommands);
        grunt.task.run('shell:js_' + parentTask + '_jspm_bundle');
    }

    function runConcatBundlePolyfillsTask(bundles) {
        var dest = parentTask == 'export' ? activeTheme.export : activeTheme.public;
        var concatConfigurator = require('../../lib/jspm/concat-configurator')(activeTheme, dest);
        grunt.config('concat.js_' + parentTask + '_jspm_bundle_polyfills', concatConfigurator.buildConfigForPolyfilledBundles({}, bundles));
        grunt.task.run('concat:js_' + parentTask + '_jspm_bundle_polyfills');
    }

    function runStringReplaceTask(taskTarget) {
        var stringReplaceBundlesReplacement = require('../../lib/jspm/string-replace-bundles-replacement')(processorOptions);
        var taskWithTarget = 'string-replace:' + taskTarget;
        var configSetting = 'string-replace.' + taskTarget + '.options.replacements';
        var replacements = grunt.config(configSetting); 
        replacements.push(stringReplaceBundlesReplacement.buildReplacement());
        grunt.config(configSetting, replacements);
        grunt.task.run(taskWithTarget);
    }

    function getBundlesToBuild() {
        const bundleFinder = require('../../lib/jspm/bundle-finder')(activeTheme, processorOptions.bundles.items);

        const specifiedBundle = grunt.option('bundle');
        const modifiedFile = grunt.config('modifiedFile');

        let bundles = [];
        
        if(specifiedBundle) {
            bundles = bundleFinder.findByEntryModule(specifiedBundle);
            if(bundles.length > 0) {
                console.log('Found bundle for specified entry module');
            } else {
                console.log('Could not find bundle for specified entry module');
            }
        } else if(modifiedFile) {
            bundles = bundleFinder.findByFilepath(modifiedFile);
            if(bundles.length > 0) {
                console.log('Found modified file in existing bundle(s)');
            } else {
                console.log('Could not find modified file in existing bundles')
            }
        } 
        
        return bundles.length === 0 ? processorOptions.bundles.items : bundles;
    }

    return {
        runTasks: runTasks
    }
}