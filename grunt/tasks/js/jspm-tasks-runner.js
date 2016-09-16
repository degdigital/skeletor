module.exports = function(grunt, activeTheme, parentTask) {
	function runTasks(){

		if(activeTheme.js.enableBundling || parentTask == 'export') {
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
		var shellBundleCommandBuilder = require('../../lib/jspm/shell-bundle-command-builder')(activeTheme);
		grunt.config('shell.js_build_jspm_unbundle.command', shellBundleCommandBuilder.buildUnbundleCommands());
		grunt.task.run('shell:js_build_jspm_unbundle');
	}

	function runBundleTasks() {
		runShellBundleTask();

		if(activeTheme.js.bundles.selfExecuting) {
			grunt.task.run('sync:js_' + parentTask + '_jspm_bundled_sfx');
			grunt.task.run('concat:js_' + parentTask + '_jspm_bundleHelper');					
		} else {
			grunt.task.run('sync:js_' + parentTask + '_jspm_bundled');
			grunt.task.run('concat:js_' + parentTask + '_jspm_config');
		}

		runConcatBundlePolyfillsTask();

		if(activeTheme.js.bundles.selfExecuting) {
			runStringReplaceTask('js_' + parentTask + '_jspm_bundleHelper');
		} else {
			runStringReplaceTask('js_' + parentTask + '_jspm_config');	
		}

		if(grunt.option('minifyJS')) {
			grunt.task.run('uglify:js_' + parentTask + '_jspm_bundled');
		}

		grunt.task.run('clean:js_jspm_bundles');
	}

	function runShellBundleTask() {
		var shellBundleCommandBuilder = require('../../lib/jspm/shell-bundle-command-builder')(activeTheme);
		grunt.config('shell.js_' + parentTask + '_jspm_bundle.command', shellBundleCommandBuilder.buildAllBundleCommands());
		grunt.task.run('shell:js_' + parentTask + '_jspm_bundle');
	}

	function runConcatBundlePolyfillsTask() {
		var dest = parentTask == 'export' ? activeTheme.export : activeTheme.public;
		var concatConfigurator = require('../../lib/jspm/concat-configurator')(activeTheme, dest);
		grunt.config('concat.js_' + parentTask + '_jspm_bundle_polyfills', concatConfigurator.buildConfigForPolyfilledBundles({}));
		grunt.task.run('concat:js_' + parentTask + '_jspm_bundle_polyfills');
	}

	function runStringReplaceTask(taskTarget) {
		var stringReplaceBundlesReplacement = require('../../lib/jspm/string-replace-bundles-replacement')(activeTheme);
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