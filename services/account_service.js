var connect = require('../config/config');

exports.userRegistration = (userData,callback) =>{

    check_duplicate_user(userData,(err,status_result) => {
        
        if(status_result[0].user_email != "")
            return callback(null, -2);
         else

         var values = [userData.user_name,userData.user_email,0,userData.hash_password,userData.security_stamp,0,0,5,'avatar',new Date()];
         var query = 'INSERT INTO app_User (user_name,user_email,email_confirmed,hash_password,security_stamp,user_status,login_fail_count,max_fail_count,avatar,date_created) VALUES(?,?,?,?,?,?,?,?,?,?)';
         try {
             connect.execute(query,values,(err,result)=>{
                 if (err) return callback(err,null);
                 return callback(null, result.insertId);
             });
         } catch (e) {
             throw Error('Registration Fail');
         }
    });
};

exports.login = (loginObj,callback) => {
    var values = [loginObj.userEmail];
    var query = 'SELECT user_email,hash_password FROM app_user WHERE user_email =?';
    try {
        connect.execute(query,values,(err,result) => {
            if(err) return callback(err,null);
            return callback(null, result);
        });
    } catch (e) {
        throw Error('Login Fail');
    }
};

var check_duplicate_user = (userDate,callback) => {
    var query = 'SELECT user_name,user_email FROM app_User WHERE user_email =? ';
    try {
        connect.execute(query,[userDate.user_email],(err,result)=>{
            if (err) return callback(err,null);
            return callback(null, result);
        });
    } catch (e) {
        throw Error('Registration Fail');
    }
};

var validate_user_input = (userdate,type,callback) =>{

};

