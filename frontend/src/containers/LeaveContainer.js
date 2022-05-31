import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as reportsActions from "../actions/reportsActions";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import ReactLoading from "react-loading";
import moment from 'moment'
import axios from 'axios'
import noPenaltiesIl from "../img/no-penalties-illustration.png";

import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";

class LeaveContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      attendaceList: [],
      endDate: new Date(),
      startDate: new Date(),
    };
  }

  componentDidMount() {
    this.getAllData()
  }

  getAllData = () => {
    let { startDate, endDate } = this.state
    let start = moment(new Date(startDate)).format('MM-DD-YYYY')
    let end = moment(new Date(endDate)).format('MM-DD-YYYY')

    if (startDate > endDate) {
      toast.error('Start date shoulen`t be greater then End date', { autoClose: 2000 });
      return
    }
   
    axios.get(`http://localhost:3001/attendance/get/${start}/${end}?status=Leave`).then(res => {
      console.log(res.data.data)
      let arr = []
      if (res.data.data.length) {
        res.data.data.forEach(element => {
          element.attendance.forEach(val => {
            arr.push({
              name: element.name,
              reason: val.reason,
              attendanceDate: val.attendanceDate
            })
          })
        });
        this.setState({
          attendaceList: arr || []
        })
      }
      this.setState({
        isLoading: false
      })
    }).catch(err => {
      this.setState({
        isLoading: false
      })
    })
  }

  employeListMain = () => {
    let array  = this.state.attendaceList || []
    array.length ? array  =  array.sort((a, b) => a.attendanceDate.localeCompare(b.attendanceDate)) : []
    return (array || []).map(item => {
      return (
        <tr>
          <td className="col-md-3">
            {item.name}
          </td>
          <td className="col-md-3">
            {moment(item.attendanceDate).format('DD-MMM-YYYY')}
          </td>
          <td className="col-md-6">
            {item.reason || '--'}
          </td>
        </tr>
      );
    })
  }

  hanldeChangeFilter = (key , e) => {
    if(key === 'start'){
      this.setState({ startDate: e })

    }else{
      this.setState({ endDate: e })

    }
  }

  render() {
    let { startDate, endDate } = this.state
    if (this.state.isLoading) {
      // if doing asyng things
      return (
        <div className="flexCenter">
          <ReactLoading type={"bars"} color={"pink"} />
        </div>
      );
    } // render the loading component
    return (
      <div className="container">

        <div className="row flex item-center">
          <div className="col-md-3">

            <div className="form-group datePickerCustom">
              <label htmlFor="startdate">Start Date *</label>
              <DateTimePicker
                onChange={(e) => this.hanldeChangeFilter('start',e)}
                format="DD MMM YYYY"
                time={false}
                value={startDate ? new Date(startDate) : new Date('01-01-2022')}
              />
            </div>
          </div>
          <div className="col-md-3">

            <div className="form-group datePickerCustom">
              <label htmlFor="startdate">End Date *</label>
              <DateTimePicker
                onChange={(e) => this.hanldeChangeFilter('end',e)}
                format="DD MMM YYYY"
                time={false}
                value={endDate ? new Date(endDate) : new Date('01-01-2022')}
              />
            </div>
          </div>
          <div className="col-md-2">

            <button
              type="submit"
              className="btn btn-primary submit-button"
              onClick={(e) => this.getAllData()}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.state.attendaceList.length > 0 ? (
              <div className="portlet-body penalties__wrapper">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      {/* <th>Today Status</th> */}
                      <th>Leave Date</th>
                      <th>Reason</th>
                      {/* <th>Description</th> */}
                    </tr>
                  </thead>
                  <tbody>{this.employeListMain()}</tbody>
                </table>
              </div>
            ) : <div className="portlet-body no-penalties__wrapper">
              <img
                src={noPenaltiesIl}
                alt="Missing data illustration"
                className="no-data__image"
              />
              <p className="no-data">
                There are no Leave between these dates! <br />
              </p>
            </div>}
          </div>
        </div>
        <ToastContainer autoClose={3000} closeOnClick />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reports: state.reports
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(reportsActions, dispatch)
  };
};

LeaveContainer.propTypes = {
  reports: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveContainer);
