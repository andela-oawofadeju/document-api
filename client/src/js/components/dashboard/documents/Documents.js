import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Row, Col, Icon, Pagination } from 'react-materialize';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Search from '../Search';
import Document from './Document';
import DocumentApi from '../../../utils/DocumentsApi';
import { loadDocuments, searchDocument, getPrivateDocuments, getPublicDocuments } from '../../../actions/Documents';
import CreateDocument from './CreateDocument';
import modal from '../../common/modal';
import { getPayload } from '../../../utils/helpers';



function RenderView({ props }) {
  return (
    <div>
      <div className="documents">
        <div className="row">
          {props.documents.map(this.renderDocument)}
        </div>
      </div>
    </div>
  )
}

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      type: 'all'
    }
    this.renderDocument = this.renderDocument.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    this.setState({ query: event.target.result })
    this.props.searchDocument(getPayload().id, event.target.value);
  }

  onClick(e) {
    this.setState({ showCreate: true });
  }

  componentDidMount() {
    this.props.loadDocuments()
  }

  renderDocument(document) {
    return <Document key={document.id} document={document} />
  }

  RenderView() {
    return (
      <div>
        <div className="documents">
          <div className="row">
            {this.props.documents.map(this.renderDocument)}
          </div>
        </div>
      </div>
    )
  }

  changeAll(event) {
    this.setState(Object.assign({}, this.state, { type: 'all' }))
    this.props.loadDocuments()
  }

  changePublic(event) {
    this.setState(Object.assign({}, this.state, { type: 'public' }))
    this.props.getPublicDocuments();
  }
  changePrivate(event) {
    this.setState(Object.assign({}, this.state, { type: 'private' }))
    this.props.getPrivateDocuments();
  }

  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch} value={this.state.value} />
        <Modal
          header='Modal Header'
          trigger={
            <a className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a>
          }>
          <CreateDocument />
        </Modal>

        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s3 border" onClick={this.changeAll.bind(this)}><a href="#all">All documents</a></li>
              <li className="tab col s3 border" onClick={this.changePublic.bind(this)}><a className="active" href="#public">public documents</a></li>
              <li className="tab col s3 border" onClick={this.changePrivate.bind(this)}><a href="#private">Private  Documents</a></li>
            </ul>
          </div>

          {['all', 'public', 'private'].map((type, index) => {
            if (this.state.type === type) {
              return (
                <div key={index} id={type} className="col s12">
                  {this.RenderView()}
                </div>
              )
            }
          })}          
        </div>

        <Pagination items={10} activePage={2} maxButtons={8} /> </div>
    );
  }
}

Documents.contextTypes = {
  router: React.PropTypes.object.isRequired
}

/**
 *
 *
 * @param {any} state
 * @returns {boolean}
 */

const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documents
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadDocuments: bindActionCreators(loadDocuments, dispatch),
    searchDocument: bindActionCreators(searchDocument, dispatch),
    getPrivateDocuments: bindActionCreators(getPrivateDocuments, dispatch),
    getPublicDocuments: bindActionCreators(getPublicDocuments, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
