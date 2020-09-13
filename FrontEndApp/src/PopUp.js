import React, { Component } from "react";

export default class PopUp extends Component {
  
  constructor() {
    super();
    this.state = {
        message: '',
        path: ''
    }
  }
  
  handleClick = () => {
   this.props.toggle();
  };




render() {
  return (
   <div className="modal">
     <div className="modal_content">
     <span className="close" onClick={this.handleClick}>&times;    </span>
     <p>
       { this.props.message }
     </p>
     <br>
     </br>
     <p>
       Your file is generated at: { this.props.path } 
     </p>

    </div>
   </div>
  );
 }
}