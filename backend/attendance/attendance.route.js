'use strict';
const {Router} = require('express');
const LeaveController = require("./attendance.controller");

const router = Router();
router.post("/request", LeaveController.requestAttendance);
router.get("/get/:startDate/:endDate", LeaveController.getAttendance);


module.exports = router;
