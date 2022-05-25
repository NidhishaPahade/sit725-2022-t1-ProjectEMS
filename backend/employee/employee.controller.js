const Employee = require("./employee.model");
const _ = require("underscore");
const vm = require("v-response");


//add  Employee's
exports.addEmployee = async (req, res, next) => {
    try {

        const createEmployeeObject = await new Employee(req.body.employee);
        const saveEmployee = await createEmployeeObject.save();

        if (!saveEmployee) {
            return res.status(400)
                .json(vm.ApiResponse(false, 400, "Oops! an error occurr"))
        } else {
            return res.status(201)
                .json(vm.ApiResponse(true, 200, `Employee added successfully`, createEmployeeObject));
        }

    } catch (e) {
        return next(e);
    }

};


//get  Employee's
exports.getEmployeeList = async (req, res, next) => {
    try {

        const findEmployees = await Employee.find({})
        if (findEmployees) {
            return res.status(201)
                .json(vm.ApiResponse(true, 200, `Employee Listing`, findEmployees));

        } else if (findEmployees.length === 0) {

            return res.status(201)
                .json(vm.ApiResponse(true, 200, `Employee Listing`, {}));

        } else {
            return res.status(400)
                .json(vm.ApiResponse(true, 400, `Oops! an error occurr`));
        }

    } catch (e) {
        return next(e);
    }

};


//get  Employee
exports.getEmployee = async (req, res, next) => {
    try {

        const employeeID = req.params.employeeID
        const getEmployee = await Employee.findOne({_id: employeeID})
        if(!getEmployee) return res.status(404)
                .json(vm.ApiResponse(true, 404, `Oops! employee not found`));

        return res.status(201)
                .json(vm.ApiResponse(true, 200, `Employee record`, getEmployee));


    } catch (e) {
        return next(e);
    }

};


//update  Employee's
exports.updateEmployee = async (req, res, next) => {
    try {

        const employeeID = req.params.employeeID
        const checkEmployee = await Employee.findOne({_id: employeeID})
        if(!checkEmployee) return res.status(404)
                .json(vm.ApiResponse(true, 404, `Oops! employee not found`));

        await checkEmployee.update(req.body.employee)

        const getEmployee = await Employee.findOne({_id: employeeID})

        return res.status(201)
                .json(vm.ApiResponse(true, 200, `Employee updated successfully`, getEmployee));

    } catch (e) {
        return next(e);
    }

};




//delete  Employee's
exports.deleteEmployee = async (req, res, next) => {
    try {

        const employeeID = req.params.employeeID
        const checkEmployee = await Employee.findOne({_id: employeeID})
        if(!checkEmployee) return res.status(404)
                .json(vm.ApiResponse(true, 404, `Oops! employee not found`));

        await checkEmployee.deleteOne({_id: employeeID})

        return res.status(201)
                .json(vm.ApiResponse(true, 200, `Employee deleted successfully`));

    } catch (e) {
        return next(e);
    }

};

