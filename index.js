const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Using the Node.js Path Module:

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// Summary: Writing code to gather information about the members of a development team, and render an HTML file with the information.

/*MANAGER PROFILE
------------------*/

// Questions for receiving user inputs, via inquirer, to create manager profile

const managerQuestions = [ // For manager, I need name, id, email, office number
    {
        type: "input",
        name: "managerName",
        message: "Please enter the manager's name.",
        validate(answer) { // User must enter a name consisting of at least one character

            if(!answer) {
                return "Please enter a valid name containing one or more characters.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "managerId",
        message: "Please enter the manager's ID.",
        validate(answer) {

            const validId = answer.match(/^[1-9]\d*$/);

            if(!validId) { // User must enter a whole number above zero
                return "Invalid ID! Please enter a non-negative integer.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Please enter the manager's email address.",
        validate(answer) { // Format of user input should be something like xxx@xxx.xxx

            const validEmail = answer.match(/^\S+@\S+\.\S+$/); // Not ironclad validation, but sufficient to flag basic user input errors like spaces in between, no period or no domain
            if(!validEmail) {
                return "Invalid email! Please enter a valid email address.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        validate(answer) { // User must enter a whole number above zero

            const validOfficeNumber = answer.match(/^[1-9]\d*$/);

            if(!validOfficeNumber) {
                return "Invalid office number! Please enter a non-negative integer.";
            }
            return true;
        }
    }
]

