import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getUser } from '../../../actions/Users';
import { bindActionCreators } from 'redux'

class ViewUser extends Component {
  componentWillMount() {
    this.props.getUser(this.props.params.id)
  }

  renderUser(user) {
    return (
      <div className="col s12 m12" key={user.id}>
        <div className="card darken-1">
          <div className="card-content ">
            <span className="card-title">{user.username}</span>
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
            <p>{user.email}</p>
          </div>
          <div className="card-action">
            <div className="row">
              <div className="col s4 m4">
                <Link key="1" to={`/dashboard/users/${user.id}`}> <i 
                  className="material-icons prefix">remove_red_eye</i></Link>
              </div>
                <div className="col s4 m4">
                  <a href="#modal1"> <i className="material-icons prefix">mode_edit</i></a>              </div>
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
        {this.props.user.map(this.renderUser.bind(this))}
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
    user: state.users
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: bindActionCreators(getUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser)