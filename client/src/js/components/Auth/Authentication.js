import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { isAuthenticated, getPayload, getToken } from '../../utils/helpers';
import * as authActions from '../../actions/Authentication'

export default (ComposedComponent)  => {
  class Authentication extends React.Component {
  
    componentWillMount() {
      if(isAuthenticated()) {
        this.props.actions.authenticate()
      } else {
        this.context.router.push('/login')
      }
    }
    
    componentWillUpdate(nextProps) {
      if(!nextProps.auth.authenticated) {
        this.context.router.push('/')
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }
  
  Authentication.contextTypes = {
    router: React.PropTypes.object
  }
  const mapStateToProps = (state) => {
    return {
      auth: state
    }
  }
  
  const mapDispatchToProp = (dispatch) => {
    return {
      actions: bindActionCreators(authActions, dispatch)
    }
  }
  return connect(mapStateToProps, mapDispatchToProp)(Authentication);
}