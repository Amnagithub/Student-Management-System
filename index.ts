#!/usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk"

class student {
    id :number;
    name :string;
    courseOffered:string[];
    feeAmount:number;
    constructor(id:number,name:string,courseOffered:string[],feeAmount:number){
        this.id = id;
        this.name = name;
        this.courseOffered = courseOffered;
        this.feeAmount = feeAmount
    }
}
let baseId = 10000; 
let studentid: any = "";
let continueEnroll = true;

let students:student[] = []

do {
    let answers = await inquirer.prompt([
        {
            type: "list",
            name: "ans",
            message :"Please Select an Option:\n",
            choices: ["Add Student","View Student Status","Delete Student","Exit"],
        }
    ])
    if (answers.ans === "Add Student"){
        let studentname = await inquirer.prompt([
            {
                type: "input",
                name: "ans",
                message: "Enter Student Name:",
            }
        ])
        let trimstudent =(studentname.ans).trim().toLowerCase();
        let checkname = students.map(obj => obj.name);

        if (checkname.includes(trimstudent)=== false){
        if (trimstudent !== ""){
            baseId++
            studentid = "STUD" + baseId
            
            console.log(chalk.bold.yellowBright("\n\t Your Account Has Been Created."));
            console.log(chalk.bold.green(`\n\t *** Welcome ${trimstudent} ***`));

            let course = await inquirer.prompt({
                type: "list",
                name: "ans",
                message : "Select a Course",
                choices: ["English","History","Computer Science","Account"]
            })

            let coursefee = 0;
            switch (course.ans){
                case "English":
                    coursefee = 2000;
                    break;
                    case "History":
                        coursefee = 1500;
                        break;
                        case "Computer Science":
                            coursefee = 10000;
                            break;
                            case "Account":
                                coursefee = 4000;
                                break;
                                }
                                    let courseconfirm = await inquirer.prompt({
                                        type: "confirm",
                                        name: "ans",
                                        message: "Do you want to enroll in this course?"
                                    })
                                    if(courseconfirm.ans=== true){
                                        let Student = new student(
                                            studentid,trimstudent,[course.ans],coursefee)
                                            students.push(Student)
                                            console.log(chalk.bgCyanBright.bold("\n\t Your have successfully enrolled in this course."))                 
            }
        } else {
            console.log(chalk.bold.redBright("Invalid Name!"))
        }
    } else{
        console.log(chalk.bold.redBright('This name is already exists.'));
    }
} else if (answers.ans === "View Student Status"){
    if (students.length !== 0){
        let studentNameCheck = students.map(e => e.name)
        
        let selectedStudent = await inquirer.prompt({
            type: "list",
            name: "ans",
            message : "Please Select Name ",
            choices : studentNameCheck,
        })
        let foundstudent = students.find(Student => Student.name === selectedStudent.ans)
        
        console.log("\tStudent Information");
        console.log(foundstudent);
        console.log("\n");
        } else {
            console.log(chalk.bold.redBright("Recored id empty!"));
        }
} else if (answers.ans === "Delete Student") {
    if (students.length !== 0){
        let studentNameCheck = students.map(e => e.name)
        let selectedStudent = await inquirer.prompt({
            type: "list",
            name: "ans",
            message : "Please Select Name ",
            choices : studentNameCheck,
        })
        let index = students.findIndex(Student => Student.name === selectedStudent.ans)
        if(index !== -1){
            students.splice(index,1)
            console.log(chalk.bgCyanBright.bold("\n\t Student has been deleted successfully."))
            } else {
                console.log(chalk.bold.redBright("Student not found!"));
            }
            }
        }       
    let userconfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message : "Do you want to continue ?"
    })
if(userconfirm.ans === false){
    continueEnroll = false
}
}while(continueEnroll)










