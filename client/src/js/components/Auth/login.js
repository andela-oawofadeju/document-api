import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux'

import { TextInput } from '../common/forms';
import { connect } from 'react-redux';
import * as authAction from '../../actions/Authentication';
import { Alert } from '../common/alert';

import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      LoginEmail: '',
      LoginPassword: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [ e.target.name ] : e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.actions.signInUser(this.state);
  }
  render() {
    const error = () => {
      if(this.props.auth.error) {
        return <Alert message={this.props.auth.error} type="danger" />
      }
    }
    return (
      <div>
        <div className="col m6 l6 s12 ">
          <div className="login">
            <p><strong>Login as a Registered User</strong></p>
            <div className="row">
              <form onSubmit={this.onSubmit} className="col s12">
                { error()}
                <div className="row">
                  <TextInput
                    id="LoginEmail"
                    type="email" 
                    value={this.state.username}
                    className="validate" 
                    name="LoginEmail" 
                    label="LoginEmail"
                    onChange={this.onChange} /> 
                </div>

                <div className="row">
                  <TextInput 
                    id="LoginPassword" 
                    type="password" 
                    value={this.state.LoginPassword}
                    className="validate" 
                    name="LoginPassword"
                    label="LoginPassword"
                    onChange={this.onChange}/>
                </div>
                <div className="row">
                  <div className="col m12 l12 s12 ">
                    <button className="btn btn-large waves-effect waves-light"> Login </button>
                  </div>
                </div>
              </form> 
              <div className="row">
                <div className="col m12 l12 s12 ">
                  <button className="btn btn-large waves-effect waves-light"> Facebook </button>
                </div>
              </div>
              <div className="row">
                <div className="col m12 l12 s12 ">
                  <button className="btn btn-large waves-effect waves-light"> Google </button>
                </div>
              </div>
              <div className="row">
                <div className="col m12 l12 s12 ">
                  <button className="btn btn-large waves-effect waves-light"> Twitter </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   actions: bindActionCreators(authAction, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)