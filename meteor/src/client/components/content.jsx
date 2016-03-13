import {Component} from 'react';
import ReactMixin from 'react-mixin';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

import {login, logout, isStaff} from 'client/libs';

import {UserComponent} from './user';

class ActiveLink extends Component {
  render() {
    if (!this.props.user) {
      return false;
    }
    const className = (this.props.link === FlowRouter.current().path) ? 'active' : '';
    return (
      <a href={this.props.link}
        className={className}
        onClick={() => $('.navbar-collapse').collapse('hide') }>
        {this.props.text}
      </a>
    );
  }
}

Meteor.loginAsDebug = function() {
  Accounts.callLoginMethod({
    methodArguments: [{ debug: true, password: 'admin-password' }]
  });
};

const LoginOutComponent = React.createClass({
  getInitialState() {
    Meteor.call('isDebug', this.setDebug);
    return { debug: false };
  },
  setDebug(err, debug) {
    if (err) {
      logout();
    } else {
      if (debug && this.props.student && !this.props.student.debug) {
        logout();
      }
      this.setState({ debug: debug });
    }
  },
  onClick() {
    $('.navbar-collapse').collapse('hide')
    if (this.props.user) {
      logout();
    } else {
      if (!this.state.debug) {
        login();
      } else {
        Meteor.loginAsDebug();
      }
    }
  },
  render() {
    const name = this.props.user ? 'logout' : 'login';
    return (
      <li><a onClick={this.onClick}>{name}</a></li>
    );
  }
});

@ReactMixin.decorate(ReactMeteorData)
class LeaderboardNavComponent extends Component {
  getMeteorData() {
    const ready = false;
    const loading = true;
    let data = {ready, loading}

    const handle = TargetSubs.subscribe('targets');
    if (handle.ready()) {
      const targets = TargetNames.find(
        {},
        { sort: { _id: 1 } }
      ).fetch();
      data.targets = targets;
      data.ready = true;
      data.loading = false;
    } else {
      data = {...this.data};
      data.loading = true;
    }
    return data;
  }

  render() {
    const prefix = LEADERBOARD;
    const {ready, loading, targets} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    const list = targets.map((target) => {
      const {_id} = target;
      return (
        <li key={_id}>
          <a href={`/${prefix}/${_id}`}>
            {_id}
          </a>
        </li>
      );
    });
    let className = 'dropdown-toggle';
    if (pathIsLeaderboard(FlowRouter.current().path)) {
      className += ' active';
    }
    return (
      <li className='dropdown'>
        <a href="#"
          className={className}
          id="menu-leaderboard"
          title="Leader Board"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false">
          leaderboard
        </a>
        <ul className="dropdown-menu">
          {list}
        </ul>
      </li>
    );
  }
}

class SecondNavComponent extends Component {
  render() {
    const {user} = this.props;
    let leftLinks = null;
    if (user) {
      leftLinks = (
        <ul className="nav navbar-nav left">
          {isStaff(user) ?
            <li><ActiveLink link="/leaders" text="leaders" user={user}/></li>
            : null
          }
          <li><ActiveLink link="/" text="results" user={user}/></li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-default navbar-fixed-top navbar-second-top">
        <a className="logo-fixed hidden-md hidden-lg"href="https://www.ops-class.org/">
          <img src="/img/logos/ops-class.jpg" alt="ops-class.org logo" />
        </a>
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#inner-navbar" aria-expanded="false" aria-controls="navbar">
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
                  <li><ActiveLink link="/test161" text="about" user={true}/></li>
                  <li><ActiveLink link="/profile" text="settings" user={user}/></li>
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
