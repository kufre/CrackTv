var con = require('../../config/config');

exports.get_all_admin_user = (callback)=>{
    var query = 
    `SELECT 
    user.admin_id as Id,
    role .role_name as role,
    user.full_name as name,
    user.email,
    user.phone,
    user.sex,
    user.marital_status,
    DATE_FORMAT(user.date_of_birth,"%M %d %Y") as date 
    FROM admin_user user 
    INNER JOIN app_role role on user.role_id = role.role_id
    WHERE user.status = 0`;
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
exports.get_admin_user = (id,callback)=>{
    var query = 
    `SELECT 
     role_id,
     full_name,
     sex,
     marital_status,
     date_of_birth 
     FROM admin_user user 
     INNER JOIN app_role role on user.role_id = role.role_id
     WHERE admin_id = ? and status = 0`;
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
exports.add_admin_user = (user,callback)=>{

    check_duplicate_email(user.email,(err,return_status)=> 
    {
        if(err)
            return callback(null,-3); 
        else if(return_status.length > 0)
            return callback(null,-1); 
        else  
            check_duplicate_phone_number(user.phone,(err,return_status)=>{
            if(err)
                return callback(err,null); 
            else if(return_status.length > 0)
                return callback(null,-2); 
            else  
            try {
                var values = [
                    user.role_id,
                    user.first_name,
                    user.last_name,
                    user.other_name,
                    user.full_name,
                    user.email,
                    user.phone,
                    user.hash_password,
                    0,
                    user.address,
                    user.sex,
                    user.marital_status,
                    user.date_of_birth,
                    0,
                    0,
                    user.security_stamp,
                    0,
                    new Date()];
                    
                    var query ="INSERT INTO admin_user (role_id,first_name,last_name,other_name,full_name,email,phone,hash_password,status,address,sex,marital_status,date_of_birth,fail_count,email_confirmed,security_stamp,is_blocked,date_created)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    
                    con.execute(query,values, (err, results) => {
                    if (err) return callback(err,null);
                    return callback(null, results.insertId);
                    });
                } 
                catch (e) {
                    throw Error('Error while Paginating Todos');
                }
        });
    });

};
exports.remove_admin_user = (id,callback)=>{
    var query ='UPDATE admin_user SET status = 1 WHERE admin_id = ?';
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
exports.update_admin_user = (admin_id,user,callback) =>{
    try {

        check_duplicate_email(user.email,admin_id,(err,result) => {
            if(err)
                return(err,null);
            else if(result < 1)
                return callback(null, result);
            else
                check_duplicate_phone_number(user.phone,admin_id,(err,result) => {
                    if(err)
                        return(err,null);
                    else if(result < 1)
                        return callback(null, result);
                    else

                    var values = [
                        user.admin_id,
                        user.role_id,
                        user.first_name,
                        user.last_name,
                        user.other_name,
                        user.full_name,
                        useer.email,
                        user.phone,
                        user.address,
                        user.sex,
                        user.marital_status,
                        user.date_of_birth,
                        ];
                    var query =`UPDATE admin_user SET
                                role_id = ?,
                                first_name = ?,
                                last_name = ?,
                                other_name = ?,
                                fullName = ?,
                                email = ?,
                                phone = ?,
                                address = ?,
                                sex = ?,
                                marital_status = ?,
                                date_of_birth = ?,
                                WHERE admin_id = ?`;
                        try {
                            con.execute(query,[admin_id,values], (err, results) => {
                                if (err) return callback(err,null);
                                return callback(null, results.insertId);
                            });
                        } 
                        catch (e) {
                            throw Error('SERVER ERROR ...' +e.message);
                        }

                });
        });
        
    } catch (error) {
        throw Error('SERVER ERROR ...' +error.message);
    }
};


// MARK USER ACTION



// HELPER 
var check_duplicate_email = (email,callback)=>{
 
        try {
            var query = 'SELECT admin_id FROM admin_user WHERE email = ?';
            con.execute(query,[email], (err, results) => {
                if (err) 
                    return callback(err,null);
                else
               
                return callback(null,results);
            });
        } catch (e) {
            console.log(e);
            throw Error('Server Error ....'+e.message);
        }
};
var check_duplicate_phone_number = (phone_number,callback)=>{
      console.log(phone_number);
    
    try {
            var query = 'SELECT admin_id FROM admin_user WHERE phone = ?';
            con.execute(query,[phone_number], (err, results) => {
                if (err) return callback(err,null);
                return callback(null,results);
            });
        } catch (e) {
            throw Error('Server Error ....'+e.message);
        }
};

