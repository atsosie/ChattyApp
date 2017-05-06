import React, { Component } from 'react';

class Notification extends Component {

  render() {
  console.log("within Notification render(), this.props.content = ", this.props.content);
    return (
      <div className="notification">
        <span className="notification-content">{ this.props.content }</span>
      </div>
    );
  }
}

export default Notification;