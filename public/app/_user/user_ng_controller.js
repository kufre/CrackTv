
'use strict';

angular.module('app').controller('user_controller', ['$scope','$timeout', 'user_service','role_service', function($scope,$timeout, user_service,role_service) {
    var self = this;
    self.user = {
        category_id: null,
        category_name:'',
        _csrf:''
    };
    $scope.roleies = [];
    self.reset = reset;
    $scope.loading = false;
    $scope.message = false;
    $scope.show_add_btn = true;
    $scope.show_updae_btn = false;
    

    $scope.displayMessage = "";
    $scope.alert_type = "";
    $scope.type = "";
    var ok = "alert-success";
    var warning  = "alert-warning";
    


    get_users();
    get_roles();

    function get_users(){        
    	role_service.get_roleies()
            .then(
            function(d) {
                self.roles = d.data;
            },
            function(errResponse){
                console.log('Error while fetching contacts');
            }
        );
    }
    function get_roles(){
        role_service.get_roleies()
            .then(
            function(d) {
                $scope.roleies = d.data;
            },
            function(errResponse){
                console.log('Error while fetching contacts');
            }
        );
    }



    $scope.add_category =()=>{
        self.category._csrf = angular.element($('#_csrf')).val();
        // validation 
        $scope.loading = true;
        category_service.add_category(self.category)
        .then(
            function(response) {
             
               if(response.status == 200)
               {
                var msg = self.category.category_name +" "+"Category Added Successfully";
                successMessage(msg);
                return;
               }
               clear_form(response.message);
               return;
            },
            function(errResponse){
                console.error('Error while fetching contacts');
            }
        );
    };
    $scope.update_category =() =>{
        // validation
        $scope.loading = true;
       
    	category_service.update_category(self.category)
            .then(
           function(response){
               
            if(response.status == 200)
            {
                var msg  = self.category.category_name+" Category Updated Successfully";
                successMessage(msg);
            }
           },
            function(errResponse){
                console.error('Error while updating contact');
            }
        );
    };
    $scope.edit_category = (id)=>{
        //validation 
        category_service.get_category(id)
        .then(
            function(response) {
                
               if(response.status == 200)
               {
                    self.category.category_id = response.data[0].category_id;
                    self.category.category_name = response.data[0].category_name;
                    $scope.show_updae_btn = true;
                    $scope.show_add_btn = false;
                    return;
               }
               clear_form(response.message);
            },
            function(errResponse){
                console.error('Error while fetching contacts');
            }
        );
    };

   
    function reset(){
        self.category = {category_id: null,category_name:''};
        $scope.show_add_btn = true;
        $scope.show_updae_btn = false;
       return;
    }
    function clear_form(message){
            $scope.message = true;
            $scope.type = "Error";
            $scope.alert_type = warning;
            $scope.displayMessage = message;
            $timeout(function () {
                $scope.loading = false;
                $scope.message = false;  
                $scope.alert_type = warning;
            }, 2000); return;
    }
    function successMessage(msg){
        $scope.message = true;
        $scope.type = "Success";
        $scope.alert_type = ok;
        $scope.loading = false;
        $scope.displayMessage = msg;
       
        get_categories();
        $timeout(function () {
            $scope.message = false;  
            $scope.alert_type = warning;
            $scope.loading = false;
            reset();
        }, 2000); return;
    }

}]);