import React, { Component } from "react";
import PropTypes from "prop-types";
import { XCircle, Edit, Eye } from "react-feather";
import { confirmAlert } from "react-confirm-alert";
import Link from "react-router-dom/es/Link";
import * as _ from "lodash";
import moment from "moment";
import Modal from "react-awesome-modal";
import './modal.css'

class EmployeesTableSalary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      employeeDetails: {}
    }
  }

  render() {
    const { employees, setEmployeeEdit } = this.props;
    const newOrder = employees && employees.data && employees.data.length ? employees.data : []
    const { employeeDetails } = this.state
    const sortedEmployees = _.orderBy(
      newOrder,
      ["enddate", "name"],
      ["desc", "asc"]
    );

    const listEmployees = sortedEmployees.map(item => {
      return (
        <tr key={item._id}>
          <td>
            {item.name||''} {item.surname||''}{" "}
          </td>
          <td>{item.position || '--'}</td>
          <td>{item.salary ? `${item.salary} /-` : 'Not Added'}</td>
          <td>
            <a
              className="table-actions"
              style={{ cursor: "pointer", marginRight: 10 }}
              title="Set the employee as active, again?"
              onClick={() => setEmployeeEdit(item)}
            >
              <Edit size="18" color="lime" />
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
              <th>Position</th>
              <th>Salary</th>
              <th className="status-column">action</th>
            </tr>
          </thead>
          <tbody>{listEmployees}</tbody>
        </table>
      </div>
    );
  }
}

EmployeesTableSalary.propTypes = {
  employees: PropTypes.array.isRequired,
  removeEmployee: PropTypes.func.isRequired
};

export default EmployeesTableSalary;
