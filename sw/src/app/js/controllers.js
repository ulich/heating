define(['exports'], function(exports) {
'use strict';

var appControllers = angular.module('myApp.controllers', []);

exports.TemplateController = appControllers.controller('TemplateController', ['$scope', '$location', function($scope, $location) {
    $scope.changeView = function(view) {
        $location.path(view);
    };
    $scope.isLocation = function(view) {
        return ($location.path() === view);
    };
}]);




exports.MainController = appControllers.controller('MainController', ['$scope', 'Config', function ($scope, Config) {
    $scope.enabled = true;
    $scope.config = Config.defaults();
    $scope.loading = true;
    $scope.applying = false;

    Config.fetch()
        .then(function (response) {
            $scope.config = response.data;
            $scope.activeWeeklySet = $scope.config.weekly.sets[$scope.config.weekly.activeSet];
            $scope.loading = false;
        });

    $scope.setEnabled = function(enabled) {
        if ($scope.enabled !== enabled) {
            $scope.enabled = enabled;
        }
    };

    $scope.isDirty = function() {
        if ($scope.config.weekly.activeSet === Config.defaults().weekly.activeSet) {
            return false;
        }

        var idx = $scope.config.weekly.sets.indexOf($scope.activeWeeklySet);
        return ($scope.config.weekly.activeSet !== idx);
    };

    $scope.showApplyButton = function() {
        return $scope.applying || $scope.isDirty();
    };

    $scope.apply = function() {
        var idx = $scope.config.weekly.sets.indexOf($scope.activeWeeklySet);
        $scope.config.weekly.activeSet = idx;
        $scope.applying = true;
        Config.save($scope.config)
            .then(function() {
                $scope.applying = false;
            });
    };
}]);




exports.ConfigController = appControllers.controller('ConfigController', ['$scope', '$window', '$location', 'Config',
                function($scope,   $window,   $location,   Config) {
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
        if ($scope.config.weekly.sets.length === 0) {
            $window.alert('Mindestens eine Konfiguration muss existieren!');
            return;
        }

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

    // $window.onbeforeunload = function() {
    //     return "Es exisitieren noch ungespeicherte Änderungen";
    // };

    $scope.cancel = function() {
        $scope.confirmClose = false;
        $location.path('/');
    };
}]);

});