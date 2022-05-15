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
     
      </div>
    );
  }
}

export default Profile;
