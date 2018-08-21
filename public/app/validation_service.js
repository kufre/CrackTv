angular.module('app').factory('validation_service', [ function(){


    let _get_validation_message = (user_inputs) => {
        var error_list = [];

        if(user_input.length > 0){

            angular.forEach(user_inputs,(input) => {

                // check for required filed
                if(input.name !== 'undefined' && input.type == 'text')
                {

                    if(input.name == null || input.name == '' || input.name.length == 0)
                    {
                        error_list.push(input.error_message);
                    }
                }
                // check for required email 
                if(input.name !== 'undefined' && input.type == 'email')
                {
                    if(input.name == null || input.name == '' || input.name.length == 0)
                    {
                        error_list.push(input.error_message);
                    }
                }

                
            });
            
        }
        return error_list;
    };


    return {
        validation:_get_validation_message
    };

}]);