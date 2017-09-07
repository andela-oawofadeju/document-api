import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Search from '../Search';
import User from './User';
import UserApi from '../../../utils/UserApi';
import { loadUsers } from '../../../actions/Users';



class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.renderUser = this.renderUser.bind(this);
  }
  

  // componentWillMount() {
  //   this.props.loadDocuments()
  //   console.log(this.state);
  // }

    componentDidMount() {
      this.props.loadUsers()
      console.log(this.state);
    }

  renderUser(user) {
    return <User key={user.id} user={user}/>
  }

  render() {
   return (
      <div>
        <Search />
         <div className="users">
            <div className="row">
              {this.props.users.map(this.renderUser)}
            </div>
          </div>
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
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: bindActionCreators(loadUsers, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);