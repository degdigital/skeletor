module.exports = function() {
    function configureImportPath(activeTheme, themes) {
        var theme = activeTheme; 
        var cssPathStack = [theme.source.assetPaths.css];

        while(theme.parentTheme) {
            theme = themes[theme.parentTheme];
            cssPathStack.push(theme.source.assetPaths.css);
        }

        return cssPathStack;
    }

    return {
        configureImportPath: configureImportPath
    }
}