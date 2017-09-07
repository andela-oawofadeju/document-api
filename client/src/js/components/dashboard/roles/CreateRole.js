import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import * as roleAction from '../../../actions/Roles';
import { TextInput, TextArea } from '../../common/forms';
import { connect } from 'react-redux';

import axios from 'axios';

class CreateRole extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
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
    this.props.actions.createRole(this.state);
  }
  render() {
    return (
      <div>
        <div className="col m12 l12 s12 ">
          <div className="login">
            <div className="row">
              <form onSubmit={this.onSubmit} className="col s12">
                <div className="row">
                  <TextInput
                    cls="col m12 l12 s12"
                    id="first_name"
                    type="text" 
                    value={this.state.title}
                    className="validate" 
                    name="title" 
                    label="title"
                    onChange={this.onChange} /> 
                </div>
                <div className="row">
                  <div className="col m12 l12 s12 ">
                    <button className="btn btn-large waves-effect waves-light"> Save </button>
                  </div>
                </div>
              </form> 
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(roleAction, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(CreateRole);