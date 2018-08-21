
'use strict';
angular.module('app').controller('admin_user_controller', ['$scope','$timeout', 'admin_user_service','role_service', function($scope,$timeout, admin_user_service,role_service) {
    var self = this;
    $scope.user = {
        _id: null,
        role:'',
        firstname:'',
        lastname:'',
        othername:'',
        email:'',
        phone:'',
        address:'',
        DOB:'',
        sex:'',
        status:'',
        _csrf:''
    };
    $scope.admin_users = [];
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
    


    get_roles();
    get_admin_users();
    function get_roles(){        
    	role_service.get_all_roles()
            .then(
            function(d) {
                $scope.roles = d.data;
            },
            function(errResponse){
                console.log('Error while fetching contacts');
            }
        );
    }
    function get_admin_users(){
        admin_user_service.get_all_admin_users()
        .then(
            function(response){
                $scope.admin_users = response.data
            },function(err){
                console.error('Error while fetching contacts');
            });
    }
    $scope.add_admin_user =()=>{
       
        $scope._csrf = angular.element($('#_csrf')).val();
        // validation 
        $scope.loading = true;
        admin_user_service.add_admin_user($scope.user)
        .then(
            function(response) {
             
               if(response.status == 200)
               {
                var msg = $scope.user.firstname +" "+$scope.user.lastname+" Added Successfully";
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
       
        get_admin_users();
        $timeout(function () {
            $scope.message = false;  
            $scope.alert_type = warning;
            $scope.loading = false;
            reset();
        }, 2000); return;
    }

}]);