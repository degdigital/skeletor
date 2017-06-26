System.registerDynamic('main.js', [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    const testVar = 'variable test';

    console.log(testVar);
  })(this);

  return _retrieveGlobal();
});