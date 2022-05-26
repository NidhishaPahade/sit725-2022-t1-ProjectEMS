const Attendance = require("./attendance.model");
const Employee = require("../employee/employee.model");

const _ = require("underscore");
const vm = require("v-response");

//request  Attendance
exports.requestAttendance = async (req, res, next) => {
    try {
        const findUser = await Employee.findById(req.body.employeeID);
        if(!findUser)
            return res.status(404)
                .json(vm.ApiResponse(false, 404, "Oops! employee not found"))

        const attendanceDate = new Date(req.body.attendanceDate);
        // Add some days to date
        req.body.attendanceDate = addDays(attendanceDate, 1);

        const createAttendanceObject = await new Attendance(req.body);
        const createAttendance = await createAttendanceObject.save();

        if (!createAttendance) {
            return res.status(400)
                .json(vm.ApiResponse(false, 400, "Oops! an error occurr"))
        } else {
            return res.status(201)
                .json(vm.ApiResponse(true, 200, `Attendance added successfully`, createAttendance));
        }

    } catch (e) {
        return next(e);
    }

};



//get Attendance
exports.getAttendance = async (req, res, next) => {
    try {

        let start = new Date(req.params.startDate)
        let end = new Date(req.params.endDate)
        start = addDays(start, 1);
        end = addDays(end, 1);
        
        let matchParams = { attendanceDate: { $gte: new Date(start), $lte: new Date(end) } }
        if(req.query.status)
            matchParams = { attendanceStatus: req.query.status,
                            attendanceDate: {
                              $gte: new Date(start),
                              $lte: new Date(end)
                            }
                          }


        const findAttendance = await Attendance.aggregate().match(matchParams).group({
                                                _id:'$employeeID',
                                                attendance: {
                                                  $push: {
                                                    _id: '$_id',
                                                    attendanceDate: '$attendanceDate',
                                                    attendanceStatus: '$attendanceStatus',
                                                    reason: '$reason'
                                                  }
                                                }
                                              })

        const attendanceWithEmployee = await getAttendanceWithEmployee(findAttendance)

        return res.status(201)
                .json(vm.ApiResponse(true, 200, `Attendance Listing`, attendanceWithEmployee));
    } catch (e) {
        return next(e);
    }

};

async function getAttendanceWithEmployee(findAttendance){

    await Promise.all(
      findAttendance.map(async (item, index) => {
        if(!item._id) delete findAttendance[index]
        let employee = await Employee.findOne({ _id: item._id })
        if (employee) {
          item.name = employee.name;
          item.position = employee.position;
        }
      })
    );

    findAttendance = findAttendance.filter(function (el) {
                          return el != null;
                        });

    return findAttendance
}

// Function gets date and count days to add to passed date
function addDays(dateTime, count_days = 0){
  return new Date(new Date(dateTime).setDate(dateTime.getDate() + count_days));
}



