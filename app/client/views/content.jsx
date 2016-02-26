ActiveLink = React.createClass({
  render() {
    if (!this.props.user) {
      return false;
    }
    const className = (this.props.link === FlowRouter.current().path) ? 'active' : '';
    return (
      <a href={this.props.link}
        className={className}
        onClick={() => FlowRouter.go(this.props.link)}>
        {this.props.text}
      </a>
    );
  }
});

Meteor.loginAsDebug = function() {
  Accounts.callLoginMethod({
    methodArguments: [{ debug: true, password: 'admin-password' }]
  });
};

LoginOutComponent = React.createClass({
  getInitialState() {
    Meteor.call('isDebug', this.setDebug);
    return { debug: false };
  },
  setDebug(err, debug) {
    if (err) {
      logout();
      return;
    } else {
      if (debug && this.props.student && !this.props.student.debug) {
        logout();
      }
      this.setState({ debug: debug });
    }
  },
  render() {
    const name = this.props.user ? 'logout' : 'login';
    let onClick = this.props.user ? logout : login;
    if (this.state.debug) {
      onClick = this.props.user ? logout : Meteor.loginAsDebug;
    }
    return (
      <li><a onClick={onClick}>{name}</a></li>
    );
  }
});

LeaderboardNavComponent = React.createClass({
  mixins: [ReactMeteorData],
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
  },
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
});

SecondNavComponent = React.createClass({
  render() {
    const {user} = this.props;
    let leftLinks = null;
    if (user) {
      leftLinks = (
        <ul className="nav navbar-nav left">
          <li><ActiveLink link="/leaders" text="leaders" user={user}/></li>
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
});

ContentComponent = React.createClass({
  enforceLogin() {
    if (!this.props.user) {
      FlowRouter.go('/test161')
    }
  },
  componentDidMount() {
    this.enforceLogin();
  },
  componentDidUpdate() {
    this.enforceLogin();
  },
  render() {
    return (
      <div>
        <SecondNavComponent {...this.props}/>
        <div className="container">
          <UserComponent {...this.props}/>
        </div>
      </div>
    );
  }
});
