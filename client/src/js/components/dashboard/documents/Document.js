import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Row, Col, Icon } from 'react-materialize';
import { summarize } from '../../../utils/helpers'; 
import  ViewDocument from './viewDocument';
import CreateDocument from './CreateDocument';
import * as documentAction from '../../../actions/Documents';

class Document extends React.Component {
  
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(e) {
    this.props.actions.deleteDocument(this.props.document.id);
  }

  render() {
    return (
      <div className="col s12 m3" key={this.props.document.id}>
        <div className="card darken-1">
          <div className="card-content ">
            <span className="card-title">{this.props.document.title}</span>
            <p>{summarize(this.props.document.content, 13)}</p>
          </div>
          <div className="card-action">
            <div className="row"> 
              <div className="col s4 m4">
                <Link to={`/dashboard/documents/${this.props.document.id}`}> <i 
                  className="material-icons prefix">remove_red_eye</i></Link>
              </div>
                <div className="col s4 m4">
                  <Modal
                    header='Modal Header'
                    trigger={
                      <a href="#"> <i className="material-icons prefix">mode_edit</i></a>
                    }>
                  <CreateDocument status={'update'} document={this.props.document}/>
                  </Modal>
                </div>
              <div className="col s4 m4">
                <a href="#"> <i onClick={this.onDelete} className="material-icons prefix">delete</i></a>
              </div>
            </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(documentAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Document);
