const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require("dotenv").config();


//creating connection to SQL Database
const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
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
                    message: "What is the employees fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the employees last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employees manager ID? "
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function() {
                        var roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },
                    message: "What is this employees role? "
                }
            ]).then(function(answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?', {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function(err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        options();
                    })
            })
    })
};
//add department to the database
function addDepartment() {
    inquirer
        .prompt([{
            name: 'newDepartment',
            type: 'input',
            message: 'Which department would you like to add?'
        }]).then(function(answer) {
            connection.query(
                'INSERT INTO department SET ?', {
                    name: answer.newDepartment
                });
            var query = 'SELECT * FROM department';
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log('Your new department has been added');
                console.table('All departments:', res);
                options();
            })
        })
};
// add role to the database/salary included
function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: 'new_role',
                    type: 'input',
                    message: "What new role would you like to add?"
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of this role? (number)'
                },
                {
                    name: 'Department',
                    type: 'list',
                    choices: function() {
                        var departmentArry = [];
                        for (let i = 0; i < res.length; i++) {
                            departmentArry.push(res[i].name);
                        }
                        return departmentArry;
                    },
                }
            ]).then(function(answer) {
                let department_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].name == answer.Department) {
                        department_id = res[a].id;
                    }
                }

                connection.query(
                    'INSERT INTO role SET ?', {
                        title: answer.new_role,
                        salary: answer.salary,
                        department_id: department_id
                    },
                    function(err, res) {
                        if (err) throw err;
                        console.log('Your new role has been added!');
                        console.table('All Roles:', res);
                        options();
                    })
            })
    })
};

// exit 
function exitApp() {
    connection.end();
};