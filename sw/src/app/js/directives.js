(function() {
'use strict';

/* Directives */

var bootstrapDirectives = angular.module('bootstrap.directives', []);
bootstrapDirectives.directive('bsActive', function() {
    return function(scope, elm, attrs) {
        scope.$watch(attrs.bsActive, function(value) {
            if (value) {
                elm.addClass('active');
            }
            else {
                elm.removeClass('active');
            }
        });
    };
});

var appDirectives = angular.module('myApp.directives', []);
appDirectives.directive('appDate', ['dateFilter', '$locale', function(dateFilter, $locale) {
    function parseDate(string) {
        var regex = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.(\d{4}) ([01]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/;
        var matches = string.match(regex);
        if (matches) {
            var year = parseInt(matches[3], 10);
            var month = parseInt(matches[2], 10);
            var day = parseInt(matches[1], 10);
            var hour = parseInt(matches[4], 10);
            var minute = parseInt(matches[5], 10);
            var second = parseInt(matches[6], 10);
            return new Date(year, month-1, day, hour, minute, second);
        }
    }

    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var dateFormat = 'dd.MM.yyyy HH:mm:ss';

            ctrl.$parsers.unshift(function(viewValue) {
                var parsedDateMilissec = parseDate(viewValue);
                if (parsedDateMilissec > 0) {
                    ctrl.$setValidity('date', true);
                    return new Date(parsedDateMilissec);
                }

                // in all other cases it is invalid, return undefined (no model update)
                ctrl.$setValidity('date', false);
                return undefined;
            });

            ctrl.$formatters.unshift(function(modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
}]);

appDirectives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}]);

})();