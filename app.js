// ===== Node Packages =====
const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

// ===== START FUNCTION ===== 
async function start(){
    console.log("Let's make your Dream Team!");

    // Set Variable to hold HTML
    let teamHTML = "";

    // Variable to hold number of team members
    let teamSize;

    // First Question to ask to set up loop
    await inquirer.prompt(
        {
            type: "number",
            message: "How many people are in your team?",
            name: "noOfTeamMem"
        }
    )
    .then((data) => {

        // Number of team members placed in teamSize for scope purposes.
        // 1 is added start from 1 rather than 0 for user understanding.
        teamSize = data.noOfTeamMem + 1;
    });
    
  
    if (teamSize === 0){
        console.log("I guess there is no one on your team...");
        return;
    }
    
    // Loop begins to ask questions depending on the size of the team
    for(i = 1; i < teamSize; i++){

        // Global variables set
        let name;
        let id;
        let title;
        let email;

        // Prompts user to answer the basic questions of the employee
        await inquirer.prompt([ 
            {
                type: "input",
                message: `What is employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `what the employee (${i})'s title?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])
        .then((data) => {

            // Takes data from user and places value in global variables
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        // Switch Case depending on the title of the employee
        switch (title){
            case "Manager":

                // ask user of Manager's Office Number
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Manager's Office Number?",
                        name: "officeNo"
                    }
                ])
                .then((data) => {

                  
                    const manager = new Manager(name, id, email, data.officeNo);

                   
                    teamMember = fs.readFileSync("./Employees/manager.html");

                   
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            
            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What school is your Intern attending?",
                        name: "school"
                    }
                ])
                .then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    teamMember = fs.readFileSync("./Employees/intern.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

          
            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Engineer's GitHub?",
                        name: "github"
                    }
                ])
                .then((data) => {
                    const engineer = new Engineer(name, id, email, data.github);
                    teamMember = fs.readFileSync("./Employees/engineer.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

        } 

    } 

    // Reads main.html and places html in a variable
    const mainHTML = fs.readFileSync("./Employees/main.html");
    
   
    teamHTML = eval('`'+ mainHTML +'`');

    // write file to new team.html file
    fs.writeFile("Employees/team.html", teamHTML, function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("Success!");
      
      });

    // console.log(teamHTML);
}


start();