define(['exports'], function(exports) {
'use strict';

var appControllers = angular.module('myApp.controllers', []);

exports.TemplateController = appControllers.controller('TemplateController',
    [       '$scope', '$location',
    function($scope,   $location)
{
    $scope.changeView = function(view) {
        $location.path(view);
    };
    $scope.isLocation = function(view) {
        return ($location.path() === view);
    };
}]);




exports.MainController = appControllers.controller('MainController',
    [        '$scope', '$window', 'Config',
    function ($scope,   $window,   Config)
{
    $scope.config = Config.defaults();
    $scope.loading = true;
    $scope.applying = false;
    $scope.specials = angular.copy($scope.config.specials);

    Config.fetch()
        .then(function (response) {
            handleResponse(response);
            $scope.loading = false;
        });

    var handleResponse = function(response) {
        $scope.config = response.data;
        $scope.activeWeeklySet = $scope.config.weekly.sets[$scope.config.weekly.activeSet];
        $scope.specials = angular.copy($scope.config.specials);
    };

    var saveConfig = function(loadingIndicator) {
        $scope.applying = loadingIndicator;
        Config.save($scope.config)
            .then(function(response) {
                handleResponse(response);
                $scope.applying = false;
            });
    };

    $scope.changeMode = function(mode) {
        if ($scope.config.mode !== mode) {
            $scope.config.mode = mode;
            saveConfig(false);
        }
    };

    $scope.modeButtonClass = function(mode) {
        return ($scope.config.mode === mode) ? 'btn-primary active' : '';
    };

    $scope.isActiveSetDirty = function() {
        if ($scope.config.weekly.activeSet === Config.defaults().weekly.activeSet) {
            return false;
        }

        var idx = $scope.config.weekly.sets.indexOf($scope.activeWeeklySet);
        return ($scope.config.weekly.activeSet !== idx);
    };

    $scope.showApplyButton = function() {
        return $scope.applying || $scope.isActiveSetDirty();
    };

    $scope.apply = function() {
        var idx = $scope.config.weekly.sets.indexOf($scope.activeWeeklySet);
        $scope.config.weekly.activeSet = idx;
        saveConfig(true);
    };

    $scope.addSpecial = function() {
        var start = new Date();
        start.setTime(start.getTime() + (60 * 60 * 1000));
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);

        var stop = new Date(start.getTime() + (60 * 60 * 1 * 1000));

        $scope.specials.push({
            start: start.getTime(),
            stop: stop.getTime(),
            enabled: true
        });
    };

    $scope.deleteSpecial = function(index) {
        if ($window.confirm('Wollen Sie die spezielle Heizzeit wirklich löschen?')) {
            $scope.specials.splice(index, 1);
        }
    };

    $scope.isSpecialsDirty = function() {
        return !angular.equals($scope.specials, $scope.config.specials);
    };

    var sortSpecials = function() {
        $scope.specials.sort(function(a, b) {
            if (a.start === b.start) {
                return (a.stop - b.stop);
            }
            else {
                return (a.start - b.start);
            }
        });
    };

    $scope.saveSpecials = function() {
        for (var i=0, len=$scope.specials.length; i < len; i += 1) {
            var special = $scope.specials[i];
            if (special.start === special.stop) {
                $window.alert('Die Startzeit der speziellen Heizzeit in Zeile ' + (i+1) + ' darf nicht gleich der Endzeit sein!');
                return;
            }
            if (special.start > special.stop) {
                $window.alert('Die Startzeit der speziellen Heizzeit in Zeile ' + (i+1) + ' liegt hinter der Endzeit!');
                return;
            }
        }
        sortSpecials();
        angular.copy($scope.specials, $scope.config.specials);
        saveConfig(false);
    };

    $scope.resetSpecials = function() {
        angular.copy($scope.config.specials, $scope.specials);
    };
}]);




exports.ConfigController = appControllers.controller('ConfigController',
    [       '$scope', '$window', '$location', 'Config',
    function($scope,   $window,   $location,   Config)
{
    $scope.intervalPattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    $scope.confirmClose = true;
    $scope.loading = true;

    $scope.config = Config.defaults();
    $scope.master = angular.copy($scope.config);
    Config.fetch()
        .then(function (response) {
            $scope.config = angular.copy(response.data);
            $scope.master = angular.copy($scope.config);
            $scope.currentWeeklySet = $scope.config.weekly.sets[$scope.config.weekly.activeSet];
            $scope.loading = false;
        });

    $scope.setCurrentWeeklySet = function(set) {
        if ($scope.currentWeeklySet !== set) {
            $scope.currentWeeklySet = set;
        }
    };

    $scope.addWeeklySet = function() {
        var firstSet = ($scope.config.weekly.sets.length === 0);

        $scope.config.weekly.sets.push({
            name: 'Unbenannt',
            weekdays: [
                [], [], [], [], [], [], []
            ]});
        $scope.currentWeeklySet = $scope.config.weekly.sets[$scope.config.weekly.sets.length-1];

        if (firstSet) {
            $scope.config.weekly.activeSet = 0;
        }
    };

    $scope.deleteWeeklySet = function(set) {
        var accept = $window.confirm('Wollen Sie die Konfiguration "' + set.name + '" wirklich löschen?');
        if (!accept) {
            return;
        }

        var isCurrentSet = set === $scope.currentWeeklySet;
        var index = $scope.config.weekly.sets.indexOf(set);

        $scope.config.weekly.sets.splice(index, 1);
        var newLen = $scope.config.weekly.sets.length;
        if (newLen > 0) {
            if (isCurrentSet) {
                var currentIndex = Math.min(index, newLen-1);
                $scope.currentWeeklySet = $scope.config.weekly.sets[currentIndex];
            }
        }
        else {
            $scope.currentWeeklySet = null;
        }

        // if an item before the active set was deleted, update the activeSet index
        if (index < $scope.config.weekly.activeSet) {
            $scope.config.weekly.activeSet -= 1;
        }
        // check if the active set was deleted
        else if (index === $scope.config.weekly.activeSet) {
            var activeIndex = Math.max(0, Math.min(index, newLen-1));
            $scope.config.weekly.activeSet = activeIndex;
        }
    };

    $scope.addInterval = function(weekday, index) {
        weekday.splice(index + 1, 0, {start: '08:00', stop: '23:00'});
    };

    $scope.deleteInterval = function(weekday, index) {
        weekday.splice(index, 1);
    };

    $scope.update = function() {
        angular.copy($scope.config, $scope.master);
        $scope.confirmClose = false;

        Config.save($scope.config)
            .then(function() {
                $location.path('/');
            });
    };

    $scope.$on('$locationChangeStart', function(event, next, current) {
        if ($scope.confirmClose && !angular.equals($scope.master, $scope.config)) {
            var accept = $window.confirm('Es exisitieren noch ungespeicherte Änderungen. ' +
                'Wollen Sie wirklich ohne Speichern fortfahren?');
            if (!accept) {
                event.preventDefault();
            }
        }
    });

    $scope.cancel = function() {
        $scope.confirmClose = false;
        $location.path('/');
    };
}]);

});