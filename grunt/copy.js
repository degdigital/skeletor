module.exports = {
    "css": {
        "files": [{
            "expand": true,
            "cwd": "<%= paths.dist.css %>",
            "src": [
                "**/*.css", 
                "!atoms/**/*", 
                "!molecules/**/*", 
                "!organisms/**/*", 
                "!templates/**/*", 
                "!utilities/**/*"
            ],
            "dest": "<%= paths.app.css %>"
        }]
    },
    "fonts": {
        "files": [{
            "expand": true,
            "cwd": "<%= paths.dist.fonts %>",
            "src": [
                "**/*", 
                "!selection.json"
            ],
            "dest": "<%= paths.app.fonts %>"
        }]
    },
    "images": {
        "files": [{
            "expand": true,
            "cwd": "<%= paths.dist.images %>",
            "src": ["**/*"],
            "dest": "<%= paths.app.images %>"
        }]
    },
    "js": {
        "files": [{
            "expand": true,
            "cwd": "<%= paths.dist.js %>",
            "src": [
                "config.js",
                "*-bundle.js",
                "polyfills/*.js",
                "jspm_packages/system.js",
                "jspm_packages/system-polyfills.js"
            ],
            "dest": "<%= paths.app.js %>"
        }],
        "options": {
            "process": function (content, srcpath) {
                if(srcpath.endsWith('/config.js')) {
                    return content.replace('baseURL: "../../js/"', 'baseURL: "js/"');
                }
                return content;
            }
        }
    },
    "patterns": {
        "files": [{
            "expand": true,
            "cwd": "<%= paths.dist.patterns %>",
            "src": ["**/*-pages-*.html", "!**/*-pages-*.escaped.html"],
            "dest": "<%= paths.app.patterns %>/",
            "flatten": true,
            "filter": 'isFile',
            "rename": function(dest, src) {
                return dest + src.substr(12);
            }
        }],
        "options": {
            "process": function (content, srcpath) {
                return content.replace(/<!-- Begin Pattern Lab -->[\s\S]*<!-- End Pattern Lab -->/ig, "")
                              .replace(/<!-- Begin Pattern Lab JS -->[\s\S]*<!-- End Pattern Lab JS -->/ig, "")
                              .replace(/\.\.\/\.\.\//g, "")
                              .replace(/\.css\?[0-9]*/,".css")
            }
        }
    }
};