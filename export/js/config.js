System.config({baseURL:"js",defaultJSExtensions:!0,transpiler:"babel",babelOptions:{optional:["runtime","optimisation.modules.system"]},paths:{"github:*":"jspm_packages/github/*","npm:*":"jspm_packages/npm/*"},bundles:{"main-bundle.js":["main.js"]},map:{babel:"npm:babel-core@5.8.38","babel-runtime":"npm:babel-runtime@5.8.38","core-js":"npm:core-js@1.2.7","github:jspm/nodelibs-assert@0.1.0":{assert:"npm:assert@1.4.1"},"github:jspm/nodelibs-buffer@0.1.0":{buffer:"npm:buffer@3.6.0"},"github:jspm/nodelibs-path@0.1.0":{"path-browserify":"npm:path-browserify@0.0.0"},"github:jspm/nodelibs-process@0.1.2":{process:"npm:process@0.11.9"},"github:jspm/nodelibs-util@0.1.0":{util:"npm:util@0.10.3"},"github:jspm/nodelibs-vm@0.1.0":{"vm-browserify":"npm:vm-browserify@0.0.4"},"npm:assert@1.4.1":{assert:"github:jspm/nodelibs-assert@0.1.0",buffer:"github:jspm/nodelibs-buffer@0.1.0",process:"github:jspm/nodelibs-process@0.1.2",util:"npm:util@0.10.3"},"npm:babel-runtime@5.8.38":{process:"github:jspm/nodelibs-process@0.1.2"},"npm:buffer@3.6.0":{"base64-js":"npm:base64-js@0.0.8",child_process:"github:jspm/nodelibs-child_process@0.1.0",fs:"github:jspm/nodelibs-fs@0.1.2",ieee754:"npm:ieee754@1.1.6",isarray:"npm:isarray@1.0.0",process:"github:jspm/nodelibs-process@0.1.2"},"npm:core-js@1.2.7":{fs:"github:jspm/nodelibs-fs@0.1.2",path:"github:jspm/nodelibs-path@0.1.0",process:"github:jspm/nodelibs-process@0.1.2","systemjs-json":"github:systemjs/plugin-json@0.1.2"},"npm:inherits@2.0.1":{util:"github:jspm/nodelibs-util@0.1.0"},"npm:path-browserify@0.0.0":{process:"github:jspm/nodelibs-process@0.1.2"},"npm:process@0.11.9":{assert:"github:jspm/nodelibs-assert@0.1.0",fs:"github:jspm/nodelibs-fs@0.1.2",vm:"github:jspm/nodelibs-vm@0.1.0"},"npm:util@0.10.3":{inherits:"npm:inherits@2.0.1",process:"github:jspm/nodelibs-process@0.1.2"},"npm:vm-browserify@0.0.4":{indexof:"npm:indexof@0.0.1"}}});var polyfillTests={},bundleHelper=function(){function a(){"undefined"!=typeof System&&System.config&&(k=System.baseURL,b())}function b(){for(var a=0;a<i.length;a++)c(i[a]);System.config({map:j})}function c(a){var b=e(a);j[a.filename]=b}function d(a){for(var b=0;b<i.length;b++)if(i[b].filename===a)return i[b];return null}function e(a){for(var b=a.filename.replace(/\.js$/,""),c=0;c<a.tests.length;c++){var d=a.tests[c],e=polyfillTests[d];e()||(b+="-"+d)}return b+".js"}function f(a){var b,c=document.getElementsByTagName("script")[0],d=a.replace("/","").replace(/[^\w\s]/gi,"");document.getElementById(d)||(b=document.createElement("script"),b.id=d,b.onload=function(){},b.src=a,c.parentNode.insertBefore(b,c))}function g(a){a.lastIndexOf(".js",a.length-3)===-1&&(a+=".js");var b=d(a);if(b){var c=e(b),g=k+"/"+c;f(g)}}function h(a){k=a}var i=[{filename:"main-bundle.js",tests:[]}],j={},k="<%= jsUrl %>";return a(),{loadBundle:g,setBaseURL:h}}();