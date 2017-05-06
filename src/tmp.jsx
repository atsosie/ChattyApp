  {
          this.props.messages.map((currentMessage) => {
            return <Message
                      key={ currentMessage.id }
                      username={ currentMessage.username }
                      content={ currentMessage.content }
                    />
          })}
// -----------------------------

import React, { Component } from 'react';

class /* Name */ extends Component {
  render() {
    return (
      //add html
    )
  }
}

export default /* Name */;

//--------------------------------

COLORS
green: 88b04b
grey: D6D5DA