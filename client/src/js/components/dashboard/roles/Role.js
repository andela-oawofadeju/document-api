import React from 'react';
import { Link } from 'react-router';
import  ViewRole from './viewRole';

class Role extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col s12 m3" key={this.props.role.id}>
        <div className="card darken-1">
          <div className="card-content ">
            <span className="card-title">{this.props.role.title}</span>
            <p>{this.props.role.title}</p>
          </div>
          <div className="card-action">
            <div className="row"> 
              <div className="col s4 m4">
                <Link to={`/dashboard/roles/${this.props.role.id}`}> <i 
                  className="material-icons prefix">remove_red_eye</i></Link>
              </div>
                <div className="col s4 m4">
                  <a href="#modal1"> <i className="material-icons prefix">mode_edit</i></a></div>
              <div className="col s4 m4">
                <a href="#"> <i className="material-icons prefix">delete</i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default  Role
