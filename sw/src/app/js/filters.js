(function() {
'use strict';

/* Filters */

var appFilters = angular.module('myApp.filters', []);

appFilters.filter('app.heatingEnabled', function()
{
    return function (enabled) {
        return 'Heizung ' + (enabled ? 'ein' : 'aus') + 'geschaltet';
    };
});

appFilters.filter('app.weekday', function()
{
    return function (index) {
        switch (index) {
            case 0: return 'Sonntag';
            case 1: return 'Montag';
            case 2: return 'Dienstag';
            case 3: return 'Mittwoch';
            case 4: return 'Donnerstag';
            case 5: return 'Freitag';
            case 6: return 'Samstag';
            default: return '?';
        }
    };
});

appFilters.filter('interpolate',
    [       'version',
    function(version)
{
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);

})();