var con = require('../../config/config');

exports.get_all_role = (callback)=>{
    var query = 'SELECT role_id,role_name FROM app_role WHERE status = 0 ORDER BY role_id DESC';
    try {
       con.execute(query,(err, rows) =>{
            if (err) return callback(err,null);
            return callback(null, rows);
        });
    } 
    catch (e) {
        throw Error('SERVER ERROR'+e.message);
    }
};
exports.get_role = (id,callback)=>{
  
    var query = 'SELECT role_id,role_name FROM app_role WHERE status = 0 AND role_id = ?';
   try {
        con.execute(query,[id],(err, rows)=> {
            if (err) return callback(err);
            callback(null, rows);
        });
    } 
    catch (e) {
        throw Error('Server Error....'+e.message);
    }
};
exports.add_role = (role,callback)=>{
    
    validate_user_input(role,"",(err,return_result)=> {
   
        if (return_result)
                check_duplicate_movie(role,(err,return_status)=> 
                {
                    if(err)
                        return callback(err,null); 
                    else if(return_status.length > 0)
                        return callback(null,-3); 
                    else  
                    try {
                        var query = 'INSERT INTO app_role (role_name,status,date_created) VALUES(?, ?, ?)';
                        var values = [role.role_name,0, new Date()];
                        con.execute(query,values, (err, results) => {
                            if (err) return callback(err,null);
                            return callback(null, results.insertId);
                        });
                    } 
                    catch (e) {
                        throw Error('SERVER ERROR ...'+e.message);
                    }
                });
        else
            callback(return_result,null);
    });
};
exports.remove_role = (id,callback)=>{
    var query ='UPDATE app_role SET status = 1 WHERE type_id = ?';
    try {
        con.execute(query,[id],(err, result)=> {
            if (err) return callback(err);
            callback(null, result.affectedRows);
        });
    } 
    catch(e) {
        throw Error('Server Error ....'+e.message);
    }
};
exports.update_role = (id,role,callback) =>{
console.log(role);
    try {
        validate_user_input(role,false,(err,return_result)=>{
            
            if(err)
                return callback(err,null); 
            else if(return_result)
            
                check_duplicate_movie(role,(err,return_status)=> {
                    if(err)
                        return callback(err,null); 
                    else if(return_status.length > 0)
                        return callback(null,-3); 
                    else  
                        var query = 'UPDATE app_role SET role_name = ? WHERE status = 0 AND role_id = ?';
                        try {
                            con.execute(query,[role.role_name,id], (err, results) => {
                                if (err) return callback(err,null);
                                return callback(null, results.insertId);
                            });
                        } 
                        catch (e) {
                            throw Error('SERVER ERROR ...' +e.message);
                        }
                });
            else
            callback(null,return_result);
        });
        
    } catch (error) {
        throw Error('SERVER ERROR ...' +error.message);
    }
};


let check_duplicate_movie = (role,callback)=>{
    var query = 'SELECT role_id,role_name FROM app_role WHERE role_name = ?';
    try {
        con.execute(query,[role.role_name], (err, results) => {
            if (err) return callback(err,null);
            return callback(null,results);
          });
    } catch (e) {
        throw Error('Server Error ....'+e.message);
    }
};
var validate_user_input = (input,type,callback)=> {
    
        if(input.role_name == "" || input.role_name == undefined)
            return callback(null,"ROLE NAME IS REQUIRE");
        else
            if(type != "")
                if (input.role_id < 1 || input.role_id == undefined )
                    return callback(null,"INVALID REQUEST ");
                else
                return callback(null,true);
            else
                return callback(null,true);
};