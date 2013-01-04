(function() {
'use strict';

var appServices = angular.module('myApp.services', []);

appServices.value('version', '0.1');

appServices.factory('Config', ['$http', '$q', function($http, $q) {
    var url = 'http://localhost:8001/heizung/api.lua';
    var cache;
    return {
        defaults: function() {
            return {
                weekly: {
                    sets: [],
                    activeSet: null
                }
            };
        },
        fetch: function() {
            var promise;

            if (cache) {
                var deferred = $q.defer();
                deferred.resolve({data: cache});
                promise = deferred.promise;
            }
            else {
                promise = $http.post(url, {
                    cmd: 'getConfig'
                });
                promise.success(function(data) {
                    cache = data;
                });
            }
            return promise;
        },
        save: function(data) {
            cache = data;
            return $http.post(url, {
                cmd: 'setConfig',
                params: data
            });
        }
    };
}]);

})();