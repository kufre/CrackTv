'use strict';
angular.module('app').factory('category_service', ['$http', '$q',function($http,$q){
 
    var REST_SERVICE_URI = '/api/category';

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
    let create = (category)=> {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, {category_name:category.category_name})
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
    let  update = (category)=> {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+'/'+category.category_id,{category:category})
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
    	get_categories: get_all,
        add_category: create,
        get_category: get,
        update_category: update,
        remove_category:remove
    };
    return factory;
}]);
