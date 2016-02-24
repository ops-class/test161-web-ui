ActiveLink = React.createClass({
	render() {
		if (!this.props.user) {
			return false;
		}
    const {link} = this.props;
    const {path} = FlowRouter.current();
    let className = '';
    if (path === link) {
      className += ' active';
    }
		return (
      <a href={link}
        className={className}
        onClick={() => FlowRouter.go(link)}>
        {this.props.text}
      </a>
		);
	}
});

LoginOutComponent = React.createClass({
  render() {
    const name = this.props.user ? 'Logout' : 'Login';
    const onClick = this.props.user ? logout : login;
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
                    <li><ActiveLink link="/" text="Results" user={this.props.user}/></li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <ul className="nav navbar-nav right">
                    <li><ActiveLink link="/test161" text="About" user={true}/></li>
                    <li><ActiveLink link="/profile" text="Settings" user={this.props.user}/></li>
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
