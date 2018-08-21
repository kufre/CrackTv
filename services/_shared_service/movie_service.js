var con = require('../config/config');

exports.get_all_movie = (callback)=>{
    var query =`SELECT 
                movie_id,
                movie_title,
                category_id,
                movie_description,
                movie_producer,
                web_pic,
                mobile_pic,
                movie_casts,
                movie_tags,
                date_created FROM movie WHERE status = 0`;
    try {
       con.execute(query,(err, rows)=> {
            if (err) return callback(err,null);
            return callback(null, rows);
        });
    } 
    catch (e) {
        throw Error('SERVER ERROR'+e.message);
    }
};
exports.get_movie = (id,callback)=>{
    var query =`SELECT 
                movie_id,
                movie_title,
                category_id,
                movie_description,
                movie_producer,
                web_pic,
                mobile_pic,
                movie_casts,
                movie_tags
                FROM movie WHERE 
                status = 0 AND
                movie_id = ?`;
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
exports.add_movie = (movie_type,callback)=>{

 
            check_duplicate_movie(movie_type.movie_name,(err,duplicate) =>{
                if(duplicate.length > 0)
                return callback(null, -2);

                else
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
    
};
exports.removed_movie = (id,callback)=>{
var query ='UPDATE movie SET status = 1 WHERE movie_id = ?';
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
var check_duplicate_movie = (movie_name,(err,results)=>{
    query = 'SELECT movie_id FROM movie WHERE movie_name = ?';
    try {
        con.execute(query,movie_name, (err, results) => {
            if (err)return callback(err,null);
            else
                return callback(err,results);
        });
    }catch (e) {
        throw Error('Server Error ....'+e.message);
    }
});
var validate_user_input = (user_input,callback)=> {

    var input_object = {
        MOVIE_NAME:user_input.user_name,
        MOVIE_DESCRIPTION:user_input.description,
        MOVIE_TYPE_ID:user_input.type_id,
        MOVIE_PRODUCER:user_input.producer,
        MOVIE_WEB_PIC:user_input.webpic,
        MOVIE_MOBILE_PIC:user_input.mobilepic,
        MOVIE_URL:user_input.movie_url
    };
    if(input_object.MOVIE_NAME == "" || input_object.MOVIE_NAME == undefined)
        return callback(null,"MOVIE NAME IS REQUIRE");
    else if (input_object.MOVIE_DESCRIPTION == "" || input_object.MOVIE_DESCRIPTION === undefined)
        return callback(null,"MOVIE DESCRIPTION IS REQUIRE");
    else if (input_object.MOVIE_TYPE_ID === "" || input_object.MOVIE_TYPE_ID === undefined || input_object.MOVIE_TYPE_ID < 1)
        return callback(null, "MOVIE TYPE IS NOT SELECTED");
    else if (input_object.MOVIE_PRODUCER === "" || input_object.MOVIE_PRODUCER === undefined)
        return callback(null,"PLEASE ENTER THE PRODUCER NAME");
    else if (input_object.MOVIE_WEB_PIC === "" || input_object.MOVIE_WEB_PIC === undefined)
        return callback(null,"CHOOSE A WEB PIC FOR THIS MOVIE");
    else if (input_object.MOVIE_MOBILE_PIC === "" || input_object.MOVIE_MOBILE_PIC === undefined)
        return callback(null,"CHOOSE A MOBILE PIC FOR THIS MOVIE");
    else if (input_object.MOVIE_URL === "" || input_object.MOVIE_URL === undefined)
        return callback(null,"MOVIE PATH IS NOT PROVIDED");
    else
        return callback(null,"ok");
};