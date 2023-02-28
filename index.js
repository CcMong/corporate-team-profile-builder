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

// Questions for receiving user inputs, via inquirer, to create the Manager profile

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
];

// Function to create a new Manager profile

// First declare two arrays: one into which we will push in all the team member objects as we create them, and the second to put the team member IDs to ensure that they cannot be duplicated

const fullTeam = [];
const teamMemberIds = [];

function createNewManager() {

    inquirer
    .prompt(managerQuestions)
    .then((answers) => {

        console.log(answers);

        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);

        console.log(manager);

        fullTeam.push(manager);

        console.log(fullTeam);

        teamMemberIds.push(answers.managerId);

        addMoreTeamMembers();
    })
};

// Function to prompt the user about specifying and adding new members to the team.

function addMoreTeamMembers() {

    inquirer
    .prompt([
        {
            type: "list",
            name: "newTeamMember",
            message: "Which team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "None. I am done building my team."
            ]
        }
    ])
    .then((chosenMember) => {

        chosenMember.newTeamMember === "Engineer" ? addNewEngineer() 
        : chosenMember.newTeamMember === "Intern" ? addNewIntern()
        : displayTeam()
        
    })
};

/*ENGINEER PROFILE
-------------------*/

// Questions for receiving user input, via inquirer, to create Engineer profile

const engineerQuestions = [ // For engineer, I need name, id, email and github username
    {
        type: "input",
        name: "engineerName",
        message: "Please enter the engineer's name.",
        validate(answer) { // User must enter a name consisting of at least one character
            if(!answer) {
                return "Please enter a valid name containing one or more characters.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "engineerId",
        message: "Please enter the engineer's ID.",
        validate(answer) {

            const validId = answer.match(/^[1-9]\d*$/);

            if(!validId) { // User must enter a whole number above zero
                return "Invalid ID! Please enter a non-negative integer.";

            } else if(teamMemberIds.includes(answer)) {

                return "ID already exists and is unavailable. Please enter another ID."

            }
            return true;
        }
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "Please enter the engineer's email address.",
        validate(answer) { // Format of user input should be something like xxx@xxx.xxx

            const validEmail = answer.match(/^\S+@\S+\.\S+$/); // Not ironclad validation, but sufficient to flag basic user input errors like spaces in between, missing period or domain, etc

            if(!validEmail) {
                return "Invalid email! Please enter a valid email address.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's Github username?",
        validate(answer) { // User must enter a name consisting of at least one character
            if(!answer) {
                return "Please enter a valid username containing one or more characters.";
            }
            return true;
        }
    }
];

// Function to add a new engineer to the team

function addNewEngineer() {

    inquirer
    .prompt(engineerQuestions)
    .then((answers) => {

        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github);

        fullTeam.push(engineer);

        teamMemberIds.push(answers.engineerId);

        addMoreTeamMembers();
    })

};

/*INTERN PROFILE
-----------------*/

// Questions for receiving user input, via inquirer, to create Intern profile

const internQuestions = [ // For intern, I need name, id, email and school
    {
        type: "input",
        name: "internName",
        message: "Please enter the intern's name.",
        validate(answer) { // User must enter a name consisting of at least one character

            if(!answer) {
                return "Please enter a valid name containing one or more characters.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "internId",
        message: "Please enter the intern's ID.",
        validate(answer) {

            const validId = answer.match(/^[1-9]\d*$/);

            if(!validId) { // User must enter a whole number above zero
                return "Invalid ID! Please enter a non-negative integer.";
            } else if(teamMemberIds.includes(answer)) {

                return "ID already exists and is unavailable. Please enter another ID."

            }
            return true;
        }
    },
    {
        type: "input",
        name: "internEmail",
        message: "Please enter the intern's email address.",
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
        name: "school",
        message: "What college/school/university do you currently attend?",
        validate(answer) { // User must enter a name consisting of at least one 
            
            if(!answer) {
                return "Please enter a valid username containing one or more characters.";
            }
            return true;
        }
    }
];

// Function to add a new intern to the team

function addNewIntern() {

    inquirer
    .prompt(internQuestions)
    .then((answers) => {

        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.school);

        fullTeam.push(intern);

        teamMemberIds.push(answers.internId);

        addMoreTeamMembers();
    })

};

// Function to display the team when the team profile building process is complete

function displayTeam() { // fs.writeFileSync(file path, data, options)

    // The file path is to the team.html file in the output folder in the root directory. The 'render' function takes an array of team member objects and generates the corresponding HTML code using the template(s) created, before creating an HTML file

    fs.writeFileSync(outputPath, render(fullTeam), "utf-8");

};











