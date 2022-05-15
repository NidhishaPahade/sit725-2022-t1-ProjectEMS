import React, { Component } from "react";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      videoOpen: false
    };
    this.openVideoModal = this.openVideoModal.bind(this);
  }

  openVideoModal() {
    this.setState({ videoOpen: true });
  }

  render() {
    return (
      <div className="container">
             <div className="portlet portlet-boxed">
                <div className="portlet-header">
                  <h4 className="portlet-title">Profile</h4>
                </div>
                <div className="portlet-body">
                  <div className="row">
                    <div className="col">
                      <form>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              name="firstName"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputPassword1">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              name="lastName"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              name="email"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">Attendence</label>
                            <input
                              type="text"
                              className="form-control"
                              id="attendance"
                              name="attendance"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                   
                  </div>
                </div>
              </div>
      </div>
    );
  }
}

export default Profile;
