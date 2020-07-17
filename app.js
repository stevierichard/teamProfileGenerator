const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

let employees = [];

questions();

function keepGoing() {
  inquirer
    .prompt({
      type: "confirm",
      message: "Do you want to add another employee?",
      name: "go",
    })
    .then(function (go) {
      if (go.go) {
        questions();
      } else {
        console.log(employees);
        render(employees);
      }
    });
}

function questions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email address?",
        name: "email",
      },
      {
        type: "list",
        message: "what is your role?",
        name: "role",
        choices: ["Engineer", "Manager", "Intern", "Employee"],
      },
    ])
    .then((res) => {
      // console.log(res.username);
      if (res.role === "Engineer") {
        inquirer
          .prompt({
            type: "input",
            message: "What is your Github username?",
            name: "username",
          })
          .then(function (response) {
            console.log({ res, response });
            var newEngineer = new Engineer(
              res.name,
              res.id,
              res.email,
              response.username
            );
            employees.push(newEngineer);
            keepGoing();
          });
      } else if (res.role === "Manager") {
        inquirer
          .prompt({
            type: "number",
            message: "What is your officeNumber?",
            name: "officeNumber",
          })
          .then((response) => {
            var newManager = new Manager(
              res.name,
              res.id,
              res.email,
              response.officeNumber
            );
            employees.push(newManager);
            keepGoing();
          });
      } else if (res.role === "Intern") {
        inquirer
          .prompt({
            type: "input",
            message: "What is your school name?",
            name: "school",
          })
          .then((response) => {
            var newIntern = new Intern(
              res.name,
              res.id,
              res.email,
              response.school
            );
            employees.push(newIntern);
            keepGoing();
          });
      } else {
        var newEmployee = new Employee(res.name, res.id, res.email);
        employees.push(newEmployee);
        keepGoing();
      }
    });
}
