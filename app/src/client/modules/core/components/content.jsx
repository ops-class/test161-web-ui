import {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

import {login, logout} from 'client/modules/core/lib';

import {UserComponent} from './user';

class ActiveLink extends Component {
  render() {
    const {user, path, link} = this.props;
    if (!user) {
      return false;
    }
    const className = link.endsWith(path) ? 'active' : '';
    return (
      <a href={this.props.link}
        className={className}
        onClick={() => $('.navbar-collapse').collapse('hide') }>
        {this.props.text}
      </a>
    );
  }
}

Meteor.loginAsDebug = function () {
  Accounts.callLoginMethod({
    methodArguments: [ {debug: true, password: 'admin-password'} ]
  });
};

class LoginOutComponent extends Component {
  constructor(props) {
    super(props);
    Meteor.call('isDebug', (err, debug) => {
      if (err) {
        logout();
      } else {
        if (debug && this.props.student && !this.props.student.debug) {
          logout();
        }
        this.setState({ debug });
      }
    });
    this.state = { debug: false };
  }

  onClick() {
    $('.navbar-collapse').collapse('hide');
    if (!this.props.user) {
      if (!this.state.debug) {
        login();
      } else {
        Meteor.loginAsDebug();
      }
    } else {
      logout();
    }
  }

  render() {
    const name = this.props.user ? 'logout' : 'login';
    return (
      <li><a onClick={this.onClick.bind(this)}>{name}</a></li>
    );
  }
}

class SecondNavComponent extends Component {
  render() {
    const {user, params: {path}} = this.props;
    let leftLinks = (
      <ul className="nav navbar-nav left">
        <li><ActiveLink link="/leaders" text="leaders" {...{user: true, path}}/></li>
        <li><ActiveLink link="/" text="results" {...{user, path}}/></li>
      </ul>
    );
    return (
      <nav className="navbar navbar-default navbar-fixed-top navbar-second-top">
        <a className="logo-fixed hidden-md hidden-lg"href="https://www.ops-class.org/">
          <img src="/img/logos/ops-class.jpg" alt="ops-class.org logo" />
        </a>
        <div className="container">
          <div className="navbar-header">
            <button type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#inner-navbar"
              aria-expanded="false"
              aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div id="inner-navbar" className="navbar-collapse collapse">
            <div className="row">
              <div className="col-sm-6">
                {leftLinks}
              </div>
              <div className="col-sm-6">
                <ul className="nav navbar-nav right">
                  <li><ActiveLink link="/test161" text="about" user={true} path={path}/></li>
                  <li><ActiveLink link="/profile" text="settings" {...{user, path}}/></li>
                  <LoginOutComponent {...this.props}/>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

class ContentComponent extends Component {
  render() {
    return (
      <div>
        {this.props.ready ?
          <SecondNavComponent {...this.props}/> : null}
        <div className="container">
          <UserComponent {...this.props}/>
        </div>
      </div>
    );
  }
}

export default {ContentComponent};
