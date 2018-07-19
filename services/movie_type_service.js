var con = require('../config/config');

exports.getAllMovieType = (callback)=>{
    var query = 'SELECT type_id,type_name FROM movie_type WHERE status = 0';
    try {
       con.execute(query,(err, rows) =>{
            if (err) return callback(err,null);
            return callback(null, rows);
        });
    } 
    catch (e) {
        console.log(e);
        throw Error('Error while Paginating Todos');
    }
};
exports.addMovieType = (movie_type,callback)=>{
    validate_user_input(movie_type,(err,return_result)=> {
        if (return_result === 'ok')
            check_duplicate_movie(movie_type,(err,return_status)=> {
            if(return_status.length > 0)
            return callback(null,-3);   
            var values = [movie_type,0, new Date()];
            var query = 'INSERT INTO movie_type (type_name,status,date_created) VALUES(?, ?, ?)';
            try {
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
exports.getMovieType = (id,callback)=>{
    var query = 'SELECT type_name FROM movie_type WHERE status = 0 AND type_id = ?';
   try {
        con.execute(query,[id],(err, rows)=> {
            if (err) return callback(err);
            callback(null, rows);
        });
    } 
    catch (e) {
        throw Error('Error while Paginating Todos');
    }
};
exports.removeMovieType = (id,callback)=>{
var query ='DELETE FROM movie_type WHERE type_id = ?';
try {
    con.execute(query,[id],(err, result)=> {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
} 
catch (e) {
    throw Error('Server Error ....');
}
};
var check_duplicate_movie = (movie_name,callback)=>{
    var query = 'SELECT type_id,type_name FROM movie_type WHERE type_name = ?';
   
    try {
        con.execute(query,[movie_name], (err, results) => {
            if (err) return callback(err,null);
            return callback(null,results);
          });
    } catch (e) {
        
    }
};
var validate_user_input = (user_input,callback)=> {

    var input_object = {
        TYPE_NAME:user_input.type_name,
    };
    if(input_object.TYPE_NAME == "" || input_object.TYPE_NAME == undefined)
        return callback(null,"TYPE NAME IS REQUIRE");
    else
        return callback(null,"ok");
};