var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    userAction();
});

function userAction() {
    inquirer.prompt([
        {
            type: "list",
            name: "request",
            message: "What would you like to do?",
            choices: ["Add employee", "Add department", "Add role", "View employees", "View departments", "View roles", "Quit"]
        }
    ]).then(function (res) {
        switch (res.request) {
            case "Add employee":
                addEmployee();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "View employees":
                viewEmployee();
                break;
            case "View departments":
                viewDepartment();
                break;
            case "View roles":
                viewRole();
                break;
            case "Quit":
                connection.end();
                break;
        }
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "roleID",
            message: "What is the employee's role id?"
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the ID of their manager? (enter null if they are a manager)"
        },
    ]).then(function (res) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.roleID, res.managerID], function (err, result) {
            if (err) {
                throw err;
            }
            userAction();
        })
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "depName",
            message: "What is the department's name?"
        },

    ]).then(function (res) {
        connection.query("INSERT INTO departments (name) VALUES (?)", [res.depName], function (err, result) {
            if (err) {
                throw err;
            }
            userAction();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role's title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the role's salary?"
        },
        {
            type: "input",
            name: "depID",
            message: "What is the role's department ID?"
        },
    ]).then(function (res) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [res.title, res.salary, res.depID], function (err, result) {
            if (err) {
                throw err;
            }
            userAction();
        })
    })
}

function viewDepartment(){
    connection.query("SELECT * FROM departments", function(err, results){
        if(err){
            throw err;
        }
        console.table(results)
    })
}

function viewEmployee(){
    connection.query("SELECT * FROM employee", function(err, results){
        if(err){
            throw err;
        }
        console.table(results)
    })
}

function viewRole(){
    connection.query("SELECT * FROM role", function(err, results){
        if(err){
            throw err;
        }
        console.table(results)
    })
}