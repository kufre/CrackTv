var validate = require('validator');
var category_service = require('../../services/_admin/category_service');


exports.get_all = (req, res)=>{
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
    // console.log(page, limit)
    try{
        category_service.get_all_category((err, results)=>{
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
    let category = {category_name:req.body.category_name};

    //validation 
   
    try{
        category_service.add_category(category,(err,results)=>{
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
        // var arr = urlparam.toString().split("=");
        // var id = arr[1];
       
        category_service.get_category(id,(err,results)=>{
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
            var category = {
                category_id:req.body.category.category_id,
                category_name:req.body.category.category_name
            };
            // server validation 
            category_service.update_category(category,(err,results)=>{
             
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






