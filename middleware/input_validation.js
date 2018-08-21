exports.validate_category_input = (input,is_update,callback) =>{
   
    if(input.category_name == "" || input.category_name == undefined)
        return callback(null, {code:-2,message:"CATEGORY NAME IS REQUIRED"});
    else
    if(is_update)
        if(input.category_id < 1 || input.category_id == undefined)
        return callback(null,{code:-3, message:"INVALID REQUEST WAS INITIATED"});
};
exports.validate_role_input = (input,is_update,callback) => {
    if(input.role_name == "" || input.role_name == undefined)
        return callback(null,{code:-2,message:"ROLE NAME IS REQUIRED"});
    else
    if(is_update)
        if(input.category_id < 1 || input.category_id == undefined)
            return callback(null,{code:-3, message:"INVALID REQUEST WAS INITIATED"});
};