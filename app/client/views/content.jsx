ActiveLink = React.createClass({
  isActive() {
    return FlowRouter.current().path === this.props.link;
  },
	getInitialState() {
		return { active: this.isActive() };
	},
	handleClick() {
		this.setState({ active: this.isActive() });
		FlowRouter.go(this.props.link);
	},
	render() {
		if (!this.props.user) {
			return false;
		}
		const active = this.state.active ? "active" : "";
		return (
			<a href={this.props.link} className={active} onClick={this.handleClick}>{this.props.text}</a>
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

