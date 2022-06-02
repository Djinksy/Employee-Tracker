const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { urlToHttpOptions } = require('url');
//creating connection to SQL Database
const connection = mysql.createConnection({
        host: 'localhost',
        port: 3001,
        user: 'root',
        password: '',
        database: 'employee_db'
    })
    //connects server and database
connection.connect(function(err) {
    if (err) throw err;
    options();
});
//running function after connection/welcome image
options = () => {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*        EMPLOYEE MANAGER         *")
    console.log("*                                 *")
    console.log("***********************************")
    promptUser();
};