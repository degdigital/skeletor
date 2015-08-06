module.exports = {
	"dev": {       
    	"files": {
    		"<%= paths.src.css %>/global.css": [
    			"<%= paths.src.css %>/utilities/**/*.css",
    			"<%= paths.src.css %>/atoms/**/*.css",
    			"<%= paths.src.css %>/molecules/**/*.css",
    			"<%= paths.src.css %>/organisms/**/*.css",
    			"<%= paths.src.css %>/templates/**/*.css"
    		]
    	}
	}
};