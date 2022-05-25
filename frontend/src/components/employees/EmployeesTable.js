import React, { Component } from "react";
import PropTypes from "prop-types";
import { XCircle, Edit , Eye} from "react-feather";
import { confirmAlert } from "react-confirm-alert";
import Link from "react-router-dom/es/Link";
import * as _ from "lodash";
import moment from "moment";

class EmployeesTable extends Component {

  

  setEmployeeAsInactive = data => {
    const { removeEmployee } = this.props;
    const date = moment().format("MM-DD-YYYY"); // end-date
    confirmAlert({
      title: "Set to inactive",
      message: "Do you want to set this employee as inactive?",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      onConfirm: () => removeEmployee(data, data._id)
    });
  };

  setEmployeeAsActive = rowNumber => {
    const { removeEmployee } = this.props;
    confirmAlert({
      title: "Set to active",
      message: "Do you want to set this employee as active?",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      onConfirm: () => removeEmployee(rowNumber, "")
    });
  };

  render() {
    const { employees } = this.props;
    const newOrder = employees && employees.data && employees.data.length ? employees.data : []

    const sortedEmployees = _.orderBy(
      newOrder,
      ["enddate", "name"],
      ["desc", "asc"]
    );

    const listEmployees = sortedEmployees.map(item => {
      return (
        <tr key={item.jmbg}>
          <td>
            <Link to={`/employees/${item.jmbg}`}> {item.name} </Link>{" "}
          </td>
          <td>{item.surname}</td>
          <td>{item.position}</td>
          <td>
            <a
                className="table-actions"
                style={{ cursor: "pointer", marginRight:10 }}
                title="Set the employee as active, again?"
                onClick={this.setEmployeeAsActive.bind(this, item.rowNumber)}
              >
                <Eye size="18" color="blue" />
              </a>
              <a
                className="table-actions"
                style={{ cursor: "pointer", marginRight:10 }}
                title="Set the employee as active, again?"
                onClick={this.setEmployeeAsActive.bind(this, item.rowNumber)}
              >
                <Edit size="18" color="lime" />
              </a>
              <a
                className="table-actions"
                title="Set the employee as inactive?"
                style={{ cursor: "pointer", marginRight:10 }}
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
      </div>
    );
  }
}

EmployeesTable.propTypes = {
  employees: PropTypes.array.isRequired,
  removeEmployee: PropTypes.func.isRequired
};

export default EmployeesTable;
