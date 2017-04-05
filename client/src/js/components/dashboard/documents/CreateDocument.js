import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import * as documentAction from '../../../actions/Documents';
import { TextInput, TextArea } from '../../common/forms';
import { connect } from 'react-redux';

import axios from 'axios';

class CreateDocument extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    console.log(e.target.value);
    this.setState({
      [ e.target.name ] : e.target.value
    })
    
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.actions.createDocument(this.state);
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
                  <TextArea 
                    id="content" 
                    value={this.state.content}
                    className="validate" 
                    name="content"
                    onChange={this.onChange}/>
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
    actions: bindActionCreators(documentAction, dispatch)
  }
}

const mapStateToProps = (state) => {
  console.log(state.documents);
  return {
    data: 'hello'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);