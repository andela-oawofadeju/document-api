import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getRole } from '../../../actions/Roles';
import { bindActionCreators } from 'redux'

class ViewRole extends Component {
  componentWillMount() {
    this.props.getRole(this.props.params.id)
  }

  renderRole() {
    let { role } = this.props;
    return (
      <div className="col s12 m12" key={role.id}>
        <div className="card darken-1">
          <div className="card-content ">
            <span className="card-title">{role.title}</span>
          </div>
          <div className="card-action">
            <div className="row">
              <div className="col s4 m4">
                <Link key="1" to={`/dashboard/roles/${role.id}`}> <i 
                  className="material-icons prefix">remove_red_eye</i></Link>
              </div>
                <div className="col s4 m4">
                  <a href="#modal1"> <i className="material-icons prefix">mode_edit</i></a> </div>
              <div className="col s4 m4">
                <a href="#"> <i className="material-icons prefix">delete</i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.role.map(this.renderRole.bind(this))}
      </div>
    );
  }
}

/**
 *
 *
 * @param {any} state
 * @returns {boolean}
 */

const mapStateToProps = (state, ownProps) => {
  return {
    role: state.roles
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRole: bindActionCreators(getRole, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRole)