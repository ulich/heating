{
    appDir: "src/app",
    baseUrl: ".",
    dir: "build/www/heating",
    
    // picks up shim config from here
    mainConfigFile: "src/app/bootstrap.js",
    modules: [
        {
            name: "bootstrap"
        }
    ],
    optimizeCss: "standard",
    removeCombined: true,
    fileExclusionRegExp: /^.gitignore$/
}