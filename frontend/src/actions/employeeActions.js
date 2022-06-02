import * as actionTypes from "../actionTypes/actionTypes";
import EmployeeApi from "../api/employeeApi";
import store from '../store/configureStore.dev.js'

export const getEmployeesMain = data => {
  return {
    type: actionTypes.GET_EMPLOYEES,
    data
  };
};

export const addEmployee = data => {
  return {
    type: actionTypes.ADD_EMPLOYEE,
    data
  };
};

export const updateEmployee = data => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE,
    data
  };
};

export const removeEmployee = data => {
  return {
    type: actionTypes.CHANGE_STATUS,
    data
  };
};

export const getEmployeesAsync = () => {
  return async (dispatch) => {
    // try {
      return new Promise(async (res, rej) => {
        await EmployeeApi.getEmployees().then(async resss => {
          console.log(resss,"resssresssresss")
          if(resss && resss.data && Object.keys(resss.data).length){

            // dispatch({
            //   type: actionTypes.GET_EMPLOYEES,
            //   data : resss.data
            // })
            // await dispatch(getEmployeesMain(resss.data));
            res(resss.data)
          }
        })
      })
    // } catch (error) {
    //   console.log("error while loading employees", error);
    //   throw error;
    // }
  };
};

export const addEmployeeAsync = (e, index) => {
  return async dispatch => {
    try {
      const employees = await EmployeeApi.addEmployee(e, index);
      // dispatch(addEmployee(employees.data));
      if(employees){
        const employeesGet = await EmployeeApi.getEmployees();
          dispatch(getEmployeesMain(employeesGet.data));
      }
    } catch (error) {
      console.log("error while adding new employee", error);
      throw error;
    }
  };
};

export const updateEmployeeAsync = (data, id) => {
  return async dispatch => {
    try {
      const employees = await EmployeeApi.updateEmployee(data, id);
      // dispatch(addEmployee(employees.data));
      if(employees){
        const employeesGet = await EmployeeApi.getEmployees();
          dispatch(getEmployeesMain(employeesGet.data));
      }
    } catch (error) {
      console.log("error while adding new employee", error);
      throw error;
    }
  };
};



export const removeEmployeeAsync = (row, id) => {
  return async dispatch => {
    try {
      const employees = await EmployeeApi.deleteEmployee(row, id);
      // dispatch(removeEmployee(employees.data));
      if(employees){
        const employeesGet = await EmployeeApi.getEmployees();
          dispatch(getEmployeesMain(employeesGet.data));
      }
    } catch (error) {
      console.log("error while changing the status of a employee", error);
      throw error;
    }
  };
};
