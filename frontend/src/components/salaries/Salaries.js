import React, { Component } from "react";
import PropTypes from "prop-types";
import generateSalaryIl from "../../img/generate-salary-illustration.png";
import { ToastContainer, toast } from "react-toastify";
import * as employeeActions from '../../actions/employeeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmployeesTableSalary from "../employees/EmployeesTableSalary";
import Modal from "react-awesome-modal";

class Salaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editData: {},
      showModal: false,
      salaryValue: ''
    };
  }

  componentDidMount() {
    this.props.actions.getEmployeesAsync();
  }

  handleSubmitMain = () => {
    let { salaryValue, editData } = this.state;
    if(salaryValue.length){
      if(salaryValue.length <= 10){
        this.props.actions.updateEmployeeAsync({salary:salaryValue} , editData._id)
        this.setState({
          editData: {},
          showModal: false,
          salaryValue: ''
        });
      }else{
        toast.error('Salary should be less then 10000000000', { autoClose: 2000 });
        return
      }
    
    }else{
      toast.error('Please enter correct salary', { autoClose: 2000 });
      return
    }
  }

  render() {
    let { editData, salaryValue } = this.state;
    return (
      <div>
        <div className="container">
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h4 className="portlet-title">Add/Update Employee salary</h4>
            </div>
            <div className="portlet-body">
              <div className="row">
                <div className="col-md-9">
                  <EmployeesTableSalary
                    employees={this.props.employees}
                    setEmployeeEdit={(data) => this.setState({ salaryValue : data.salary , editData: data, showModal: true })}
                  />
                </div>
                <div className="col-md-3 generate-salary-illustration_wrapper">
                  <img
                    src={generateSalaryIl}
                    alt="Generate Salaty Illustration"
                    className="generate-salary-illustration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer autoClose={3000} closeOnClick />

        <Modal
          visible={this.state.showModal}
          effect="fadeInUp"
          onClickAway={() => this.setState({ showModal: false, editData: {} })}
        >
          <div className="modalMain">
            <div className="form-group">
              <label htmlFor="salarru">Add Employee Salary *</label>
              <input
                onChange={(e) => this.setState({ salaryValue : e.target.value })}
                name="salarru"
                component="input"
                type="number"
                className="form-control"
                maxLength={7}
                value={salaryValue}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary submit-button"
              style={{ marginRight: 15 }}
              onClick={(e) => this.handleSubmitMain(e)}
            >
              {editData.salary ? 'Update' : 'Submit'}
            </button>
            <button
              type="submit"
              style={{ height: 40 }}
              className="btn btn-seconday submit-button"
              onClick={(e) => this.setState({  showModal : false, editData: {}})}
            >
              Cancel
            </button>
          </div>
        </Modal>

      </div>
    );
  }
}

Salaries.propTypes = {
  employees: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  updateEmployee:  PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(Salaries);

