// const mysql = require('mysql');
const mysql = require('mysql2');

// const con =  mysql.createConnection({host:'localhost', user: 'root', password: '12345',database: 'diwChef'});
  
// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');
 
// create the connection, specify bluebird as Promise
const con =  mysql.createConnection({host:'localhost', user: 'root', password: '12345',database: 'on_CrackTv', Promise: bluebird});
 




con.connect((err) => {
  if (err) throw err;
  console.log('Connected to my sql server !');
});

module.exports = con;


