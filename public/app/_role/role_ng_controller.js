
'use strict';
angular.module('app').controller('role_controller', ['$scope','$timeout', 'role_service', function($scope,$timeout, role_service) {
    var self = this;
    self.role = {role_id: null,role_name:'',_csrf:''};
    self.roles = [];
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
    function get_roles(){        
    	role_service.get_all_roles()
            .then(
            function(d) {
                self.roles = d.data;
            },
            function(errResponse){
                console.log('Error while fetching contacts');
            }
        );
    }
    $scope.add_role =()=>{
        self.role._csrf = angular.element($('#_csrf')).val();
        // validation 
        $scope.loading = true;
        role_service.add_role(self.role)
        .then(
            function(response) {
                
               if(response.status == 200)
               {
                var msg = self.role.role_name +" "+"role Added Successfully";
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
    $scope.update_role =() =>{
        // validation
        $scope.loading = true;
    	role_service.update_role(self.role)
            .then(
           function(response){
               console.log(response);
            if(response.status == 200)
            {
                var msg  = self.role.role_name+" role Updated Successfully";
                successMessage(msg);
            }
           },
            function(errResponse){
                console.error('Error while updating contact');
            }
        );
    };
    $scope.edit_role = (id)=>{
        //validation 
        role_service.get_role(id)
        .then(
            function(response) {
                
               if(response.status == 200)
               {
                    self.role.role_id = response.data[0].role_id;
                    self.role.role_name = response.data[0].role_name;
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


    // function deleteContact(id){
    // 	ContactService.deleteContact(id)
    //         .then(
    //         findAllContacts,
    //         function(errResponse){
    //             console.error('Error while deleting contact');
    //         }
    //     );
    // }
 
    // function submit() {
    //     if(self.contact.contact_id===null){
    //         console.log('Saving New Contact', self.contact);
    //         createContact(self.contact);
    //     }else{
    //         updateContact(self.contact);
    //         console.log('Contact updated with id ', self.contact.contact_id);
    //     }
    //     reset();
    // }
 
   
    function reset(){
        
        self.role = {role_id: null,role_name:''};
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
        get_roles();
        $timeout(function () {
            $scope.message = false;  
            $scope.alert_type = warning;
            reset();
        }, 2000); return;
    }

}]);