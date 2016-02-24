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
                  <ul className="nav navbar-nav left">
                    <li><ActiveLink link="/" text="results" user={this.props.user}/></li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <ul className="nav navbar-nav right">
                    <li><ActiveLink link="/test161" text="about" user={true}/></li>
                    <li><ActiveLink link="/profile" text="settings" user={this.props.user}/></li>
                    <LoginOutComponent {...this.props}/>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <UserComponent {...this.props}/>
        </div>
      </div>
    );
  }
});
