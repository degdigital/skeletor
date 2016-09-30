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
        runShellBundleTask();

        if(processorOptions.bundles.selfExecuting) {
            grunt.task.run('sync:js_' + parentTask + '_jspm_bundled_sfx');                                  
            grunt.task.run('concat:js_' + parentTask + '_jspm_bundleHelper');
        } else {
            grunt.task.run('sync:js_' + parentTask + '_jspm_bundled');
            grunt.task.run('concat:js_' + parentTask + '_jspm_config');
        }

        runConcatBundlePolyfillsTask();

        if(processorOptions.bundles.selfExecuting) {
                runStringReplaceTask('js_' + parentTask + '_jspm_bundleHelper');
        } else {
                runStringReplaceTask('js_' + parentTask + '_jspm_config');      
        }

        grunt.task.run('clean:js_jspm_bundles');
    }

    function runShellBundleTask() {
        var shellBundleCommandBuilder = require('../../lib/jspm/shell-bundle-command-builder')(activeTheme, processorOptions);
        grunt.config('shell.js_' + parentTask + '_jspm_bundle.command', shellBundleCommandBuilder.buildAllBundleCommands());
        grunt.task.run('shell:js_' + parentTask + '_jspm_bundle');
    }

    function runConcatBundlePolyfillsTask() {
        var dest = parentTask == 'export' ? activeTheme.export : activeTheme.public;
        var concatConfigurator = require('../../lib/jspm/concat-configurator')(activeTheme, processorOptions, dest);
        grunt.config('concat.js_' + parentTask + '_jspm_bundle_polyfills', concatConfigurator.buildConfigForPolyfilledBundles({}));
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

    return {
        runTasks: runTasks
    }
}