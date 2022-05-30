import React, { Component } from "react";
import PropTypes from "prop-types";
import { XCircle, Edit, Eye } from "react-feather";
import { confirmAlert } from "react-confirm-alert";
import Link from "react-router-dom/es/Link";
import * as _ from "lodash";
import moment from "moment";
import Modal from "react-awesome-modal";
import './modal.css'

class EmployeesTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      employeeDetails: {}
    }
  }

  setEmployeeAsInactive = data => {
    const { removeEmployee } = this.props;
    const date = moment().format("MM-DD-YYYY"); // end-date
    confirmAlert({
      title: "Delete employee",
      message: "Do you want to delete this employee?",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      onConfirm: () => removeEmployee(data, data._id)
    });
  };

  render() {
    const { employees, setEmployeeEdit } = this.props;
    const newOrder = employees && employees.data && employees.data.length ? employees.data : []
    const { employeeDetails } = this.state
 
    let sortedEmployees  = newOrder || []
    sortedEmployees.length ? sortedEmployees  =  sortedEmployees.sort((a, b) => a.name.localeCompare(b.name)) : []

    const listEmployees = sortedEmployees.map(item => {
      return (
        <tr key={item.jmbg}>
          <td  onClick={() => this.setState({ showModal: true, employeeDetails: item })}>
           {item.name}
          </td>
          <td>{item.surname}</td>
          <td>{item.position}</td>
          <td>
            <a
              className="table-actions"
              style={{ cursor: "pointer", marginRight: 10 }}
              title="Set the employee as active, again?"
              onClick={() => this.setState({ showModal: true, employeeDetails: item })}
            >
              <Eye size="18" color="blue" />
            </a>
            <a
              className="table-actions"
              style={{ cursor: "pointer", marginRight: 10 }}
              title="Set the employee as active, again?"
              onClick={() => setEmployeeEdit(item)}
            >
              <Edit size="18" color="lime" />
            </a>
            <a
              className="table-actions"
              title="Set the employee as inactive?"
              style={{ cursor: "pointer", marginRight: 10 }}
              onClick={this.setEmployeeAsInactive.bind(this, item)}
            >
              <XCircle size="18" />
            </a>
          </td>
        </tr>
      );
    });

    return (
      <div className="portlet-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Position</th>
              <th className="status-column">action</th>
            </tr>
          </thead>
          <tbody>{listEmployees}</tbody>
        </table>
        <Modal
          visible={this.state.showModal}
          effect="fadeInUp"
          onClickAway={() => this.setState({ showModal: false, employeeDetails: {} })}
        >
          <div className="modalMain">
            <div className="itemOut">
              <h4>
                Name :
              </h4>
              <h4>
                {employeeDetails.name}
              </h4>
            </div>
            <div className="itemOut">
              <h4>
                Surname :
              </h4>
              <h4>
                {employeeDetails.surname}
              </h4>
            </div>
            <div className="itemOut">
              <h4>
                Phone Number :
              </h4>
              <h4>
                {employeeDetails.jmbg}
              </h4>
            </div>
            <div className="itemOut">
              <h4>
                Date Of Birth  :
              </h4>
              <h4>
                {employeeDetails.birthdate}
              </h4>
            </div>
            <div className="itemOut">
              <h4>
                Gender :
              </h4>
              <h4>
                {employeeDetails.gender  === 'F' ? 'Female' : 'Male'}
              </h4>
            </div>

            <div className="itemOut">
              <h4>
                Position :
              </h4>
              <h4>
                {employeeDetails.position}
              </h4>
            </div>
            <div className="itemOut">
              <h4>
                Start Date :
              </h4>
              <h4>
                {employeeDetails.startdate}
              </h4>
            </div>
            <div className="itemOut">
              <h4>
                Payoneer :
              </h4>
              <h4>
                {employeeDetails.isPayoneer}
              </h4>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

EmployeesTable.propTypes = {
  employees: PropTypes.array.isRequired,
  removeEmployee: PropTypes.func.isRequired
};

export default EmployeesTable;
