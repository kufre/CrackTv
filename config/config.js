// const mysql = require('mysql');
const mysql = require('mysql2');

// const con =  mysql.createConnection({host:'localhost', user: 'root', password: '12345',database: 'diwChef'});
  
// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');
 




// const con =  mysql.createConnection({
//   host: '108.61.47.186',
//   port:  3306,
//   user: 'innocrac', 
//   password: 'limited2008',
//   database: 'innocrac_movie', 
//   Promise: bluebird
// });
 




con.connect((err) => {
  if (err) throw err;
  console.log('Connected to my sql server !');
});

module.exports = con;


