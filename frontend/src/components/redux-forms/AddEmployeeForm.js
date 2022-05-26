import React, { useEffect, useState } from "react";
import { Field, reduxForm, reset } from "redux-form";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import { ToastContainer, toast } from "react-toastify";

moment.locale("en");
momentLocalizer();

const AddEmployeeForm1 = (props) => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    jmbg: '',
    birthdate: new Date('01-01-1996'),
    position: "",
    startdate: new Date('01-01-2022'),
    isPayoneer: false,
    gender: 'M'
  })

  useEffect(() => {
    if(Object.keys(props.editData).length){
      let obj = {...props.editData}
      setForm({...obj})
    }else{
      setForm({ 
      name: '',
      surname: '',
      jmbg: '',
      birthdate: new Date('01-01-1996'),
      position: "",
      startdate: new Date('01-01-2022'),
      isPayoneer: false,
      gender: 'M'})
    }
  }, [props.editData])

  const handleChange = (key, e) => {
    if (key === 'startdate' || key === 'birthdate') {
      setForm({
        ...form,
        [key]: e
      })
    } else if (key === 'isPayoneer') {
      setForm({
        ...form,
        isPayoneer: !form.isPayoneer
      })
    } else {
      setForm({
        ...form,
        [key]: e.target.value
      })
    }
  }


  const handleSubmitMain = (e) => {
    e.preventDefault()
    const { addEmployee, updateEmployee } = props;
    let { name, surname, jmbg, position, gender } = form
    if (name && surname && jmbg && position && gender) {

      if(Object.keys(props.editData).length){
        console.log(props.editData,"props.editDataprops.editData")
        updateEmployee({ 
          name: form.name,
          surname: form.surname,
          jmbg: form.jmbg,
          birthdate: form.birthdate,
          position:form.position,
          startdate: form.startdate,
          isPayoneer: form.isPayoneer,
          gender: form.gender,
         }, props.editData._id)
        toast.success("Employee updated!", { autoClose: 2000 });
        props.clearUpdate()
      }else{
        addEmployee({ ...form, salary: '' })
        toast.success("Employee added!", { autoClose: 2000 });
      }
      setForm({
        name: '',
        surname: '',
        jmbg: '',
        birthdate: new Date('01-01-1996'),
        position: "",
        startdate: new Date('01-01-2022'),
        isPayoneer: false,
        gender: 'M'
      })
    } else {
      toast.error("Please fill required fields!", { autoClose: 2000 });
      return
    }

  }

  console.log(form,"formformform")

  return (
    <form>
      <ToastContainer autoClose={3000} closeOnClick />
      <div className="form-group form__small">
        <label htmlFor="name">Name *</label>
        <input
          onChange={(e) => handleChange('name', e)}
          name="name"
          component="input"
          type="text"
          className="form-control"
          value={form.name}
          required
        />
      </div>

      <div className="form-group form__small form__small--right">
        <label htmlFor="surname">Surname *</label>
        <input
          onChange={(e) => handleChange('surname', e)}
          name="surname"
          component="input"
          type="text"
          className="form-control"
          value={form.surname}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="jmbg">JMBG *</label>
        <input
          onChange={(e) => handleChange('jmbg', e)}
          name="jmbg"
          component="input"
          type="text"
          className="form-control"
          value={form.jmbg}
          required
        />
      </div>

      <div className="form-group form__small datePickerCustom">
        <label htmlFor="birthdate">Date Of Birth *</label>
        <DateTimePicker
          onChange={(e) => handleChange('birthdate', e)}
          format="DD MMM YYYY"
          time={false}
          value={form.birthdate ? new Date(form.birthdate) : new Date('01-01-1996')}
        />
      </div>

      <div className="form-group form__small form__small--right">
        <label htmlFor="gender">Gender *</label>
        <select
          onChange={(e) => handleChange('gender', e)}
          name="gender"
          component="select"
          className="form-control"
          required
          value={form.gender}
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <hr></hr>

      <div className="form-group">
        <label htmlFor="position">Position *</label>
        <input
          onChange={(e) => handleChange('position', e)}
          name="position"
          component="input"
          type="text"
          className="form-control"
          required
          value={form.position}
        />
      </div>

      <div className="form-group datePickerCustom">
        <label htmlFor="startdate">Start Date *</label>
        <DateTimePicker
          onChange={(e) => handleChange('startdate', e)}
          format="DD MMM YYYY"
          time={false}
          value={form.startdate ? new Date(form.startdate) : new Date('01-01-2022')}

        />
      </div>

      <div className="form-group">
        <input
          onChange={(e) => handleChange('isPayoneer', e)}
          name="isPayoneer"
          className="form__small--check"
          component="input"
          type="checkbox"
          value={form.isPayoneer ? true : false}
        />
        <label htmlFor="isPayoneer" className="form__small--check__label">
          Is Payoneer
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary submit-button"
        onClick={(e) => handleSubmitMain(e)}
      >
        {Object.keys(props.editData).length ? 'Update' : 'Submit'}
      </button>
    </form>
  );
}

const AddEmployeeForm = reduxForm({
  form: "addEmployeeForm"
})(AddEmployeeForm1);

export default AddEmployeeForm;
