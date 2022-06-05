const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


//creating connection to SQL Database
const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database`)
);
//connects server and database
connection.connect(function(err) {
    if (err) throw err;
    options();
});

//prompts show with a list of options
function options() {
    inquirer
        .prompt({
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update employee role',
                'Delete an employee',
                'EXIT'
            ]
        }).then(function(answer) {
            switch (answer.choices) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'EXIT':
                    exitApp();
                    break;
                default:
                    break;

            }
        })
};
//employee database
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'employees found');
        console.table('All employees:', res);
        options();
    })
};
//departments database
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All departments:', res);
        options();
    })
};
//roles database
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All roles', res);
        options();
    })
};
//adding a new employee to the database
function addEmployee() {
    connection.query('SELECT * FROM role', function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: 'first_name',
                    type: 'input',
                    message: 'What is the employees first name?',
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'What is the employees last name?',
                },
                {

                }
            ])
    })
}