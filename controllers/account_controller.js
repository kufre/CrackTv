var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var user_Service = require('../services/account_service');
exports.userRegistration = (req, res, next) => {
    try
    {
       
        var userObj = {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            confirm_password: req.body.confirm_password,
            hash_password:'',
            security_stamp:''
        };
            
        // validation 
        if(userObj.user_name === "" || userObj.user_name === undefined)
        {
            console.log("userName error");
            return;
        }
        if (userObj.user_email === "" || userObj.user_email === undefined)
        {
            console.log("userEmail error");
            return;
        }
        if (userObj.user_password === "" || userObj.user_password === undefined)
        {
            console.log("password error");
            return;
        }
       // hash_password
        userObj.hash_password = bcrypt.hashSync(userObj.user_password, salt);
        userObj.security_stamp = bcrypt.hashSync(userObj.user_name, salt);
    
        user_Service.userRegistration(userObj,(err,results)=> {
            if (err)
            throw err; // or return an error message, or something
        else
            if(results === -2)
                return res.status(200).json({status: 201, data: "", message: "USER WITH THIS EMAIL ALREADY EXSIT PLEASE KINDLY LOGIN"});
            else
                return res.status(200).json({status: 200, data: results, message: "ok"});     
        });
    } 
    catch (e) 
    {
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.login = (req, res, next) => {
   
    let loginObj={
        userEmail: req.body.email,
        userPassword: req.body.password,
        hash_password: ''
    };
    console.log(loginObj);
    try {
        // validation 
    
        // hash_password
       
        loginObj.hash_password = bcrypt.hashSync(loginObj.userPassword, salt);
        user_Service.login(loginObj,(err,results) =>{
            if(err)
                throw err;
            else
            var status = bcrypt.compareSync(loginObj.userPassword, results[0].hash_password);
           if(status)
            return res.status(200).json({status: 200, data: results, message: "ok"});  
            else
            return res.status(400).json({status: 401, data: "", message: "username or password is invalid"}); 
        });
    } 
    catch (e) 
    {
        return res.status(400).json({status: 400, message: e.message});
    }


};


