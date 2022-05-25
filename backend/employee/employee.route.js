'use strict';

const {Router} = require('express');
const employeeController = require("./employee.controller");

const router = Router();

router.post("/addEmployee", employeeController.addEmployee);
router.post("/updateEmployee/:employeeID", employeeController.updateEmployee);

router.delete("/deleteEmployee/:employeeID", employeeController.deleteEmployee);

router.get("/getEmployeeList", employeeController.getEmployeeList);
router.get("/getEmployee/:employeeID", employeeController.getEmployee);

module.exports = router;
