import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Search from '../Search';
import { Modal, Button, Row, Col, Icon } from 'react-materialize';
import { loadUsers } from '../../../actions/Users';
import { bindActionCreators } from 'redux';
import User from './User';
class UserList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  renderUsers(user) {
    return <User key={user.id} user={user} />
  }
render() {
    return (
      <div>
        <div>
        <Search />
         <div className="users">
          </div>
    </div>
        <table className="striped bordered responsive-table">
          <thead>
            <tr>
              <th>Username</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Role Access</th>
                <th>Edit Role</th>
                <th>View</th>
                <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { this.props.users.map(this.renderUsers.bind(this))}
          </tbody>
        </table>
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

const mapStateToProps = (state) =>  {
  return {
    users:  state.users
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers:  bindActionCreators(loadUsers, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);