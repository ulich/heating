// load all of the dependencies asynchronously.

require.config({
    paths: {
        'text': 'lib/require/text'
    },

    shim: {
        'lib/angular/angular-locale_de': {
            deps: ['lib/angular/angular']
        },
        'js/app': {
            deps: [
                'lib/angular/angular-locale_de'
            ]
        }
    }
});

define(['js/app'], function() {
    // when all is done, execute bootstrap angular application
    angular.bootstrap(document, ['myApp']);
});