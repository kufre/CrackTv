'use strict';
angular.module('app').factory('admin_user_service', ['$http', '$q',function($http,$q){
 
    var REST_SERVICE_URI = '/api/user_setup';

    let get_all = () => {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching contacts');
                deferred.reject(errResponse);
            }
        );        
        return deferred.promise;
    };
    let create = (user)=> {
        var deferred = $q.defer();
   
        $http.post(REST_SERVICE_URI, {user:user})
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating contact');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    };
    let get = (id) => {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+'/'+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating contact');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    };
    let  update = (user)=> {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+'/'+user.id,{user:user})
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating contact');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    };
    let remove =(id) => {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+'/'+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting contact');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    };
    var factory = {
    	get_all_admin_users: get_all,
        add_admin_user: create,
        get_admin_user: get,
        update_admin_user: update,
        remove_admin_user:remove
    };
    return factory;
}]);
