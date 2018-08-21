var con = require('../../config/config');

exports.get_all_category = (callback)=>{
    var query = 'SELECT category_id,category_name FROM category WHERE status = 0 ORDER BY category_id DESC';
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
exports.get_category = (id,callback)=>{
    var query = 'SELECT category_id,category_name FROM category WHERE status = 0 AND category_id = ?';
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
exports.add_category = (category,callback)=>{
    
    validate_user_input(category,false,(err,return_result)=> {
        if(err)        
            return callback(null,err); 
        else if (return_result)
        
            check_duplicate_movie(category,(err,return_status)=> 
            {
                
                if(err)
                
                    return callback(err,null); 
                else if(return_status.length > 0)
                    return callback(null,-3); 
                else  
               try {
                   
                    var values = [category.category_name,0, 0,new Date()];
                    var query = 'INSERT INTO category (category_name,status,user_id,date_created) VALUES(?, ?, ?,?)';
                    con.execute(query,values, (err, results) => {
                        if (err) return callback(err,null);
                        return callback(null, results.insertId);
                    });
                } 
                catch (e) {
                    throw Error('SERVER ERROR'+e.message);
                }
            });
        else
            callback(return_result,null);
    });
};
exports.remove_category = (id,callback)=>{
    var query ='UPDATE category_name SET status = 1 WHERE category_id = ?';
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
exports.update_category = (category,callback) =>
{
 
    try {
        validate_user_input(category,true,(err,return_result)=>{
            if(err)
                return callback(err,null); 
            else if(return_result)
                check_duplicate_movie(category,(err,return_status)=> {
                    if(err)
                        return callback(err,null); 
                    else if(return_status.length > 0)
                        return callback(null,-3); 
                    else  
                        var query = 'UPDATE category SET category_name = ? WHERE status = 0 AND category_id = ?';
                        try {
                            con.execute(query,[category.category_name,category.category_id], (err, results) => {
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
var check_duplicate_movie = (category,callback)=>{

    var query = 'SELECT category_id,category_name FROM category WHERE category_name = ?';
    try {
        con.execute(query,[category.category_name], (err, results) => {
            if (err) return callback(err,null);
            return callback(null,results);
          });
    } catch (e) {
        throw Error('Server Error ....'+e.message);
    }
};
var validate_user_input = (input,type,callback)=> {
    
    if(input.category_name == "" || input.category_name == undefined)
        return callback(null,"CATEGORY NAME IS REQUIRE");
    else
        if(type)
            if (input.category_id < 1 || input.category_id == undefined )
                return callback(null,"INVALID REQUEST ");
            else
            return callback(null,true);
        else
            return callback(null,true);
};