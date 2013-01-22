(function() {
'use strict';

var appServices = angular.module('myApp.services', []);

appServices.value('version', '0.1');

appServices.factory('url',
    [       '$window',
    function($window)
{
    var url;
    if ($window.localStorage) {
        url = $window.localStorage.getItem('heating-apiurl');
    }
    return url || 'api.lua';
}]);

appServices.factory('Status',
    [       '$http', 'url', 'Config',
    function($http,   url,   Config)
{
    return {
        fetch: function() {
            var promise = $http.post(url, {
                cmd: 'getStatus'
            });
            promise.success(function(data) {
                Config.setCachedStatus(data);
            });
            return promise;
        }
    };
}]);

appServices.factory('Config',
    [       '$http', '$q', 'url',
    function($http,   $q,   url)
{
    var cache;
    return {
        defaults: function() {
            return {
                mode: 'off',
                weekly: {
                    sets: [],
                    activeSet: null
                },
                specials: []
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
                    cmd: 'getConfigAndStatus'
                });
                promise.success(function(data) {
                    cache = data;
                });
            }
            return promise;
        },
        save: function(data) {
            cache.config = data;
            return $http.post(url, {
                cmd: 'setConfig',
                params: data
            });
        },
        setCachedStatus: function(status) {
            if (cache) {
                cache.status = status;
            }
        }
    };
}]);

})();