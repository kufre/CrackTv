var MovieType_Service = require('../services/movie_type_service');


exports.getAllMovieType = (req, res, next)=>{
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
    // console.log(page, limit)
    try{
        MovieType_Service.getAllMovieType(function(err, results){
        if (err)
            throw err; // or return an error message, or something
        else
            return res.status(200).json({status: 200, data: results, message: "ok"});
        });
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.addMovieType = (req, res, next)=>{
    //var page = req.query.page ? req.query.page : 1;
    //var limit = req.query.limit ? req.query.limit : 10; 
    // console.log(page, limit)
    try{
        var moviewType = {
            
            type_name:req.body.type_name
        };
        
        MovieType_Service.addMovieType(moviewType,(err,results)=>{
            if (err)
                throw err; // or return an error message, or something
            else if (results === -3)
                return res.status(200).json({status: 201, data: "", message: "movie already exist"});
            else
            return res.status(200).json({status: 200, data: results, message: "ok"});
        });
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.getMovieType = (req, res, next)=>{
    try{
         var id = req.params.id? req.params.id : null;
        // var arr = urlparam.toString().split("=");
        // var id = arr[1];
        
        MovieType_Service.getMovieType(id,(err,results)=>{
            if (err)
                throw err; // or return an error message, or something
            else
                return res.status(200).json({status: 200, data: results, message: "ok"});
        });
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.updateMovieType = (req, res, next)=>{
    let id = req.params.id;
    if(id > 0)
        try{
            var moviewType = {
                type_id:req.body.type_id,
                type_name:req.body.type_name
            };
            // server validation 
            MovieType_Service.updateMovieType(id,moviewType,function(err,results){
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
exports.removeMovieType =  (req, res, next)=>{
    let id = req.params.id;
   
    if(id > 0)

        try{
            MovieType_Service.removeMovieType(id,function(err,results){
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




