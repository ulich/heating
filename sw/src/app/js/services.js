(function() {
'use strict';

var appServices = angular.module('myApp.services', []);

appServices.value('version', '0.1');

appServices.factory('Config',
    [       '$http', '$q', '$window',
    function($http,   $q,   $window)
{
    var url;
    if ($window.localStorage) {
        url = $window.localStorage.getItem('heating-apiurl');
    }
    url = url || 'api.lua';
    
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