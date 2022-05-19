import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as reportsActions from "../actions/reportsActions";
import Attendance from "../components/attendance/Attendance";
import ReactLoading from "react-loading";

import _ from "lodash";

class AttendanceContainerComponent extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    if (_.isEmpty(this.props.reports)) {
      // console.log("getReportsAsync RAN");
      this.setState({ isLoading: true });
      this.props.actions.getReportsAsync();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.reports !== this.props.reports) {
      this.setState({ isLoading: false }); // new props are available
    }
  }

  render() {
    if (this.state.isLoading) {
      // if doing asyng things
      return (
        <div className="flexCenter">
          <ReactLoading type={"bars"} color={"pink"} />
        </div>
      );
    } // render the loading component

    return (
      <div>
        <Attendance history={this.props.history} reports={this.props.reports} />
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

AttendanceContainerComponent.propTypes = {
  reports: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceContainerComponent);
