// Code to define and export the Manager class. The Manager class inherits from Employee.

const Employee = require("./employee");

class Manager extends Employee {

    constructor(name, id, email, officeNumber) {

        super(name, id, email);
        
        this.officeNumber = officeNumber;

    }

    getRole() {
        
        return "Manager";
    }

    getOfficeNumber() {
        
        return this.officeNumber;
    }
}


module.exports = Manager;
