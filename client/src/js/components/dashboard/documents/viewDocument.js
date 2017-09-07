import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getDocument } from '../../../actions/Documents';
import { bindActionCreators } from 'redux'


import Modal from '../../common/modal';

class ViewDocument extends Component {
  componentWillMount() {
    this.props.getDoc(this.props.params.id)
  }

  renderDocument(document) {
    return (
      <div>
        <div className="col s12 m12" key={document.id}>
          <div className="card darken-1">
            <div className="card-content ">
              <span className="card-title">{document.title}</span>
              <p>{document.content}</p>
            </div>
          </div>
        </div>
        {/*<Modal key={document.id} />*/}
      </div>
      
    )
  }

  render() {
    return (
      <div>
        {this.props.doc.map(this.renderDocument.bind(this))}
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
    doc: state.documents
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps)
  return {
    getDoc: bindActionCreators(getDocument, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDocument);