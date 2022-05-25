import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";

moment.locale("en");
momentLocalizer();

class AddEmployeeForm extends Component {
    constructor(){
      super()
      this.state = {
        form : {
          name : '',
          surname: '',
          jmbg : '',
          birthdate: '',
          position:"",
          startdate:'',
          isPayoneer:'',
          gender:''
        }
      }
    }

  reset = () => {
    setTimeout(() => {
      this.props.reset();
    }, 100);
  };

  handleChange = (key , e) => {
    if(key === 'startdate' || key === 'birthdate'){
      this.setState({
        [key] : e
      })
    }else{
      this.setState({
        [key] : e.target.value
      })
    }
  }


  handleSubmitMain = () => {
    const { addEmployee, handleSubmit, reset } = this.props;
    handleSubmit(addEmployee)
    reset()
  }

  render() {
    console.log(this.state.form)
    const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => {
      return(
      <DateTimePicker
        onChange={onChange}
        format="DD MMM YYYY"
        time={showTime}
        value={!value ? null : new Date(value)}
      />
    )};

    const { addEmployee, handleSubmit, reset } = this.props;
    return (
      <div>
        <div className="form-group form__small">
          <label htmlFor="name">Name</label>
          <Field
            onChange={(e) => this.handleChange('name' ,e)}
            name="name"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group form__small form__small--right">
          <label htmlFor="surname">Surname</label>
          <Field
            onChange={(e) => this.handleChange('surname', e)}
            name="surname"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jmbg">JMBG</label>
          <Field
            onChange={(e) => this.handleChange('jmbg',e)}
            name="jmbg"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group form__small">
          <label htmlFor="birthdate">Date Of Birth</label>
              <DateTimePicker
                onChange={(e) =>  this.handleChange('birthdate',e)}
                format="DD MMM YYYY"
                time={false}
                value={new Date()}
              />
        </div>

        <div className="form-group form__small form__small--right">
          <label htmlFor="gender">Gender</label>
          <Field
            onChange={(e) => this.handleChange('gender',e)}
            name="gender"
            component="select"
            className="form-control"
            required
          >
            <option></option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Field>
        </div>

        <hr></hr>

        <div className="form-group">
          <label htmlFor="position">Position</label>
          <Field
            onChange={(e) => this.handleChange('position',e)}
            name="position"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startdate">Start Date</label>
          <DateTimePicker
                onChange={(e) =>  this.handleChange('startdate',e)}
                format="DD MMM YYYY"
                time={false}
                value={new Date()}
              />
        </div>

        <div className="form-group">
          <Field
            onChange={(e) => this.handleChange('isPayoneer',e)}
            name="isPayoneer"
            className="form__small--check"
            component="input"
            type="checkbox"
          />
          <label htmlFor="isPayoneer" className="form__small--check__label">
            Is Payoneer
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary submit-button"
          onClick={() => this.handleSubmitMain()}
        >
          Submit
        </button>
      </div>
    );
  }
}

AddEmployeeForm = reduxForm({
  form: "addEmployeeForm"
})(AddEmployeeForm);

export default AddEmployeeForm;
