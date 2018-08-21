var validate = require('validator');
var role_service = require('../../services/_admin/role_service');


exports.get_all_role = (req, res)=>{
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
    // console.log(page, limit)
    try{
        role_service.get_all_role((err, results)=>{
        if (err)
            throw err; // or return an error message, or something
        else
       
            return res.status(200).json({status: 200, data: results, message: "ok"});
        });
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.add_role = (req, res)=>{    


    let role = {role_name:req.body.role_name};

    //validation 
   
    try{
        role_service.add_role(role,(err,results)=>{
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
exports.get_role= (req, res)=>{
    try{
         var id = req.params.id? req.params.id : null;
        // var arr = urlparam.toString().split("=");
        // var id = arr[1];
        
        role_service.get_role(id,(err,results)=>{
            if (err)
                throw err; // or return an error message, or something
            else
                return res.status(200).json({status: 200, data: results, message: "ok"});
        });
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.update_update = (req, res)=>{
    let id = req.params.id;
    if(id > 0)
        try{
            var role = {
                role_id:req.body.role.role_id,
                role_name:req.body.role.role_name
            };
            // server validation 
            role_service.update_role(id,role,(err,results)=>{
             
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
exports.remove_role=  (req, res)=>{
    let id = req.params.id;
   
    if(id > 0)

        try{
            MovieType_Service.removeMovieType(id,(err,results)=>{
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






