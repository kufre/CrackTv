var con = require('../config/config');

exports.getAllMovie= (callback)=>{
    var query = 'SELECT type_id,type_name FROM movie_type WHERE status = 0';
    try {
       con.execute(query,(err, rows)=> {
            if (err) return callback(err,null);
            return callback(null, rows);
        });
    } 
    catch (e) {
        console.log(e);
        throw Error('Error while Paginating Todos');
    }
};
exports.addMovie = (movie_type,callback)=>{

    validate_user_input(movie_type,(err,validation)=>{
       if(!validation === 'ok')

        return callback(null,validation);

        else
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
    });
};
exports.getMovie = (id,callback)=>{
    var query = 'SELECT type_id,type_name FROM movie_type WHERE status = 0 AND type_id = ?';
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
exports.removeMovie = (id,callback)=>{
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

var check_duplicate_movie = (movie_name,(err,results)=>{
    query = 'SELECT type_id FROM movie_type WHERE type_name = ?';
    try {
        con.execute(query,movie_name, (err, results) => {
            if (err) return callback(err,null);
                
            console.log(results);
          });
    } catch (e) {
        
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