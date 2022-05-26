const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    reason: {
        type: String
    },
    employeeID: {
        type: Schema.Types.ObjectId,
        ref: "employee"
    },
    attendanceDate:{
        type : Date,
    },
    attendanceStatus: {
        type: String,
        enum: ['Absent', 'Present', 'Leave'],
        default: "Absent"
    }

}, {timestamps: true})


const leaveModel = mongoose.model("attendance", attendanceSchema, "Attendance");
module.exports = leaveModel;