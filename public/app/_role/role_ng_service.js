'use strict';
angular.module('app').factory('role_service', ['$http', '$q',function($http,$q){
 
    var REST_SERVICE_URI = '/api/role';

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
    let create = (role)=> {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, {role_name:role.role_name})
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
    let  update = (role)=> {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+'/'+role.role_id,{role:role})
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
        $http.delete(REST_SERVICE_URI+'restdeletecontroller/delete_contact/'+id)
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
    	get_all_roles: get_all,
        add_role: create,
        get_role: get,
        update_role: update,
        remove_role:remove
    };
    return factory;
}]);
