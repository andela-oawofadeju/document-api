import React, { PropTypes } from 'react';
import Login from './login';
import Register from './register'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { isAuthenticated } from '../../utils/helpers';

import * as authAction from '../../actions/Authentication';

class Auth extends React.Component {
  componentWillMount() {
    if(isAuthenticated()) {
      this.props.router.push('/dashboard')
    }
  }
  render() {
    return  (
        <div>
          <section className="auth-body">
            <span><strong>Document Management Application</strong></span>
            <div className="container custom">
              <div className="row">
                <Login />
                <Register/>
              </div>
            </div>
          </section>
        </div>
      )
    }
  }

Auth.PropTypes = {
  router: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps)(Auth)
