var validate = require('validator');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var user_service = require('../../services/_admin/admin_account_service');


exports.get_all = (req, res)=>{
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
    // console.log(page, limit)
    try{
        user_service.get_all_admin_user((err, results)=>{
        if (err)
            throw err; // or return an error message, or something
        else
            return res.status(200).json({status: 200, data: results, message: "ok"});
        });
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.add = (req, res)=>{ 

    var userObj = {
        role_id:req.body.user.role,
        first_name:req.body.user.firstname,
        last_name:req.body.user.lastname,
        other_name:req.body.user.othername,
        full_name: '',
        email:req.body.user.email,
        phone:req.body.user.phone,
        address:req.body.user.address,
        sex:req.body.user.sex,
        marital_status:req.body.user.status,
        date_of_birth:req.body.user.DOB,
        hash_password:'',
        security_stamp: '',
        password:'_crackTvWELCOMEU'
    };
    //validation 
    userObj.full_name = userObj.first_name +' '+userObj.other_name +' '+userObj.last_name;
    userObj.hash_password = bcrypt.hashSync(userObj.password, salt);
    userObj.security_stamp = bcrypt.hashSync("@#$@#$!@#$", salt);
    try{
        user_service.add_admin_user(userObj,(err,results)=>{
            if (err)
            return res.status(200).json({status: 400, data: "", message: err.message});
            // or return an error message, or something
            else if (results === -3)
                return res.status(200).json({status: 201, data: "", message: "Role already exist"});
            else
            return res.status(200).json({status: 200, data: results, message: "ok"});
        });
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.get= (req, res)=>{
    try{
        var id = req.params.id? req.params.id : null;
     //saver side validation
        user_service.get_admin_user(id,(err,results)=>{
            if (err)
                throw err; // or return an error message, or something
            else
                return res.status(200).json({status: 200, data: results, message: "ok"});
        });
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.update = (req, res)=>{
    let id = req.params.id;
    if(id > 0)
        try{
            let user = {
                admin_id:res.user.id,
                role_id:res.body.user.role,
                first_name:res.body.user.firstname,
                last_name:res.body.user.lastname,
                other_name:res.body.user.othername,
                full_name:res.body.user.email,
                email:res.body.user.phone,
                phone:res.body.user.address,
                sex:res.body.user.sex,
                marital_status:res.body.user.maritalstatus,
                date_of_birth:res.body.user.DOB
            };
            // server validation 
            user_service.update_admin_user(id,user,(err,results)=>{
             
                if (err)
                    throw err; // or return an error message, or something
                else
                    return res.status(200).json({status: 200, data: results, message: "ok"});
            });
        }catch(e){
            return res.status(400).json({status: 400, message: e.message});
        }
    else
    return res.status(400).json({status: 204, message: "No Content"});
};
exports.remove=  (req, res)=>{
    let id = req.params.id;
    if(id > 0)

        try{
            user_service.remove_admin_user(id,(err,results)=>{
                if (err)
                    throw err; // or return an error message, or something
                else
                    return res.status(200).json({status: 200, data: results, message:req.body.type_name+" "+ "removed"});
            });
        }catch(e){
            return res.status(400).json({status: 400, message: e.message});
        }
    else
    return res.status(400).json({status: 204, message: "No Content"});

};






