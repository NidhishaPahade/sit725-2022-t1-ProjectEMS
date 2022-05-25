const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    birthdate: {
        type: String
    },
    gender: {
        type: String
    },
    isPayoneer: {
        type: String
    },
    jmbg: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    salary: {
        type: String
    },
    position: {
        type: String
    },
    startdate: {
        type: String
    }

}, {timestamps: true})


const employeeModel = mongoose.model("employee", employeeSchema, "Employee");
module.exports = employeeModel;