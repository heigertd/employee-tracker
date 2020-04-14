var inquirer = require("inquirer");
var mysql = require("mysql");

inquirer.prompt([
    {
        type:"input",
        name: "name",
        message: "What is your name?"
    }
])