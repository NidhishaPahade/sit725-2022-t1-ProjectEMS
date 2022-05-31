import React, { Component } from "react";
import logo from "../../img/ems.jpg";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import AttendanceContainerComponent from "../../containers/AttendanceContainerComponent";
import EmployeesContainerComponent from "../../containers/EmployeesContainerComponent";
import Auth from "../../helper/auth";
import LoginContainerComponent from "../../containers/LoginContainerComponent";
import EmployeeProfileContainerComponent from "../../containers/EmployeeProfileContainerComponent";
import HomeContainerComponent from "../../containers/HomeContainerComponent";
import GenerateSalariesContainerComponent from "../../containers/GenerateSalariesContainerComponent";
import AttendanceDetailsContainerComponent from "../../containers/AttendanceDetailsContainerComponent";
import EmployeeStatsContainerComponent from "../../containers/EmployeeStatsContainerComponent";
import Profile from "../profile/Profile";
import LeaveContainer from "../../containers/LeaveContainer";

class PrimaryLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: ""
    };
  }

  logout = () => {
    Auth.signOut();
    this.props.removeLoggedUser();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentRoute: nextProps.history.location.pathname
    });
  }

  componentWillMount() {
    if (localStorage.getItem('token') !== null) {
      this.setState({
        currentRoute: this.props.history.location.pathname
      });
    }else{
      this.props.history.push("/login");
    }
  }

  render() {
    const { loggedUser } = this.props;
    const { currentRoute } = this.state;
    return (
      <div className="wrapper">
        <header className="" role="banner">
          {loggedUser && (
            <div className="container">
              <div className="navbar navbar__container">
                <Link to="/home">
                  <img src={logo} alt="EMS Mars logo" className="logo" />
                </Link>
                <ul className="navbar__menu">
                  <li className={currentRoute === "/home" ? "active" : ""}>
                    <Link to="/home"> Home </Link>
                  </li>

                  <li className={currentRoute === "/employees" ? "active" : ""}>
                    <Link to="/employees"> Employees </Link>
                  </li>

                  <li className={currentRoute === "/attendance" ? "active" : ""}>
                    <Link to="/attendance"> Attendence </Link>
                  </li>


                  <li className={currentRoute === "/salaries" ? "active" : ""}>
                    <Link to="/salaries"> Salaries </Link>
                  </li>

                  <li className={currentRoute === "/leave" ? "active" : ""}>
                    <Link to="/leave"> Leaves </Link>
                  </li>
                  {/* <li className={currentRoute === "/profile" ? "active" : ""}>
                    <Link to="/profile"> Profile </Link>
                  </li> */}
                </ul>
                <Link
                  to="/login"
                  onClick={this.logout}
                  className="navbar__links"
                >
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </header>
        <main>
          <Switch>
            <Route path="/home" component={HomeContainerComponent} />
            <Route path="/login" component={LoginContainerComponent} />
            <Route
              path="/salaries"
              component={GenerateSalariesContainerComponent}
            />
            <Route
              exact
              path="/employees"
              component={EmployeesContainerComponent}
            />
            <Route
              path="/employees/:itemId"
              component={EmployeeProfileContainerComponent}
            />
            <Route
              exact
              path="/attendance"
              component={AttendanceContainerComponent}
            />
            <Route
              exact
              path="/leave"
              component={LeaveContainer}
            />

            <Route
              exact
              path="/attendance/details"
              component={AttendanceDetailsContainerComponent}
            />
            <Route
              path="/attendance/details/:itemId"
              component={EmployeeStatsContainerComponent}
            />
            <Route exact path="/profile" component={Profile} />
            <Redirect to="/login" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default PrimaryLayout;
