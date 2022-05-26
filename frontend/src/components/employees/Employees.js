import React, { Component } from "react";
import PropTypes from "prop-types";
import EmployeesTable from "./EmployeesTable";
import AddEmployeeRightPanel from "./AddEmployeeRightPanel";

class Employees extends Component {
  constructor() {
    super()
    this.state = {
      editData: ''
    }
  }

  render() {
    const { employees, addEmployee, updateEmployee ,removeEmployee } = this.props;
    let { editData } = this.state
    return (
      <div className="container">
        <div className="row">
          <AddEmployeeRightPanel
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            employees={employees}
            editData={editData}
            clearUpdate={() => this.setState({ editData :'' })}
          />
          <div className="col-md-8">
            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <h4 className="portlet-title">Employees</h4>
              </div>
              <EmployeesTable
                employees={employees}
                removeEmployee={removeEmployee}
                setEmployeeEdit={(data) => this.setState({editData : data})}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Employees.propTypes = {
  employees: PropTypes.array.isRequired,
  addEmployee: PropTypes.func.isRequired,
  removeEmployee: PropTypes.func.isRequired
};

export default Employees;
