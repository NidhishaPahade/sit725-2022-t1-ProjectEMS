import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as employeeActions from '../../actions/employeeActions';
import Select from "react-select";
import moment from "moment/moment";
import noPenaltiesIl from "../../img/no-penalties-illustration.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ReactLoading from "react-loading";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendanceForm: {
        reason: "",
        employeeID: '',
        attendanceStatus: 'Present',
      },
      attendaceList: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getAllData()
  }

  getAllData = () => {
    this.setState({
      isLoading: true
    })
    this.props.actions.getEmployeesAsync().then(res => {
      this.props.actions.getEmployeesMain(res)
    })

    let today = moment(new Date()).format('MM-DD-YYYY')
    axios.get(`http://localhost:3001/attendance/get/${today}/${today}`).then(res => {
      console.log(res.data.data)
      this.setState({
        attendaceList: res.data.data || [],
        isLoading: false
      })
    }).catch(err => {
      this.setState({
        isLoading: false
      })
    })
  }

  handleInputChangeAttendance = selectedValue => {
    let { attendanceForm } = this.state;
    this.setState({
      attendanceForm: {
        ...attendanceForm,
        attendanceStatus: selectedValue.value
      }
    })
  };

  handleEmployeeChange = selectedValue => {
    let { attendanceForm } = this.state;
    this.setState({
      attendanceForm: {
        ...attendanceForm,
        employeeID: selectedValue.value
      }
    })
  };

  handleValueChange = event => {
    let { attendanceForm } = this.state;
    let { value } = event.target;
    this.setState({
      attendanceForm: {
        ...attendanceForm,
        reason: event.target.value
      }
    });
  };

  addAttendance = event => {
    event.preventDefault();
    let today = moment(new Date()).format('MM-DD-YYYY')
    let { attendanceForm } = this.state;

    if (attendanceForm.employeeID) {
      axios.post(`http://localhost:3001/attendance/request`, {
        "employeeID": attendanceForm.employeeID,
        "attendanceDate": today,
        "attendanceStatus": attendanceForm.attendanceStatus || 'Present',
        "reason": attendanceForm.reason || ''
      }).then(res => {
        this.getAllData()
        this.setState({
          attendanceForm: {
            reason: "",
            employeeID: '',
            attendanceStatus: 'Present',
          },
        })
      }).catch(err => {
      })
    } else {
      toast.error('Please select employee first', { autoClose: 2000 });
    }


  };

  employeListMain = () => {
    let array = this.state.attendaceList || []
    console.log(array, "arrayarrayarrayarray")
    array.length ? array = array.sort((a, b) => a.name.localeCompare(b.name)) : []
    return (array || []).map(item => {
      return (
        <tr>
          <td className="col-md-3">
            {item.name}
          </td>
          <td className="col-md-3">
            {item.attendance[0].attendanceStatus}
          </td>
          <td className="col-md-6">
            {item.attendance[0].reason || '--'}
          </td>
        </tr>
      );
    })
  }

  render() {
    const { attendanceForm } = this.state;
    console.log(this.props, "this.props.employees")
    let arr = []
    if(this.props && this.props.employees && this.props.employees && this.props.employees.length){
      arr = [...this.props.employees]
    }
    const employeesFormated = ( arr || []).map(emp => {
      return {
        value: emp._id,
        label: `${emp.name} ${emp.surname}`
      };
    });

    if (this.state.isLoading) {
      // if doing asyng things
      return (
        <div className="flexCenter">
          <ReactLoading type={"bars"} color={"pink"} />
        </div>
      );
    } // rende

    return (
      <div className="container">

        <div className="row">
          <div className="col-md-4">
            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <h4 className="portlet-title">Enter Employee Attendance</h4>
              </div>
              <form className="portlet-body">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Employee</label>
                  <Select
                    name="employee"
                    value={attendanceForm.employeeID}
                    onChange={this.handleEmployeeChange}
                    options={employeesFormated}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Attendance</label>
                  <Select
                    name="employee"
                    value={attendanceForm.attendanceStatus}
                    onChange={this.handleInputChangeAttendance}
                    options={
                      [
                        { value: 'Present', label: 'Present' },
                        { value: 'Absent', label: 'Absent' },
                        { value: 'Leave', label: 'Leave' }
                      ]}
                    required
                  />
                </div>

                {attendanceForm.attendanceStatus === 'Leave' && <div className="form-group">
                  <label htmlFor="description">Leave Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    id="penaltyDescription"
                    placeholder="Enter Leave Reason"
                    name="reason"
                    onChange={(e) => this.handleValueChange(e)}
                    value={attendanceForm.reason}
                    required
                  />
                </div>}
                <button onClick={(e) => this.addAttendance(e)} type="submit" className="btn btn-primary">
                  Add Attendence
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-8">
            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <h4 className="portlet-title">Attendance For Today</h4>
              </div>
              {this.state.attendaceList.length === 0 && (
                <div className="portlet-body no-penalties__wrapper">
                  <img
                    src={noPenaltiesIl}
                    alt="Missing data illustration"
                    className="no-data__image"
                  />
                  <p className="no-data">
                    There are no Attendence added at the moment! <br />
                    You can add them by filling out te form on the left.
                  </p>
                </div>
              )}
              {this.state.attendaceList.length > 0 && (
                <div className="portlet-body penalties__wrapper">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Today Status</th>
                        <th>Reason</th>
                        {/* <th>Description</th> */}
                      </tr>
                    </thead>
                    <tbody>{this.employeListMain()}</tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>


        <ToastContainer autoClose={3000} closeOnClick />
      </div>
    );
  }
}

Home.propTypes = {
  isAppGoogleSpreadsheetAuthenticated: PropTypes.bool,
  employees: PropTypes.array,
  reports: PropTypes.object,
  loans: PropTypes.object,
  setGoogleSpreadsheetAuth: PropTypes.func.isRequired,
  unsetGoogleSpreadsheetAuth: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  updateEmployee: PropTypes.func,
};


const mapStateToProps = (state) => {
  return {
    employees: state.employees
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(employeeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

