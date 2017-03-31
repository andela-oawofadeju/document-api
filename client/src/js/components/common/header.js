import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
class Header extends React.Component {

  render() {
    console.log(this.props)
    const showLink = () => {
      if(this.props.auth.authenticated) {
        return  <li><Link to="dashboard">Dashboard</Link></li>
      } else {
        return  <li><Link to="login">Login</Link></li>
      }
    }
    return (
      <header>
        <nav>
          <div className="nav-wrapper">
            <div className="row">
              <div className="col m6 s8">
                <div className="logo">
                  <Link path="home"><img src="" alt="" /><strong>Document Manager App</strong></Link>
                </div>
              </div>
              <div className="col m4 s8 menu">
                <ul>
                  <li><Link path="home">Home</Link></li>                
                  {showLink()}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authenticated
  }
}

export default connect(mapStateToProps)(Header);