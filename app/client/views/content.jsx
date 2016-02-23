ContentComponent = React.createClass({
  enforceLogin() {
    const {user} = this.props;
    if (!user) {
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
    const {user} = this.props;
    const content = (<UserComponent {...this.props}/>);
    return (
			<div>
				<TabsComponent {...this.props} />
				<div className="container">
					{content}
				</div>
      </div>
    );
  }
});

TabsComponent = React.createClass({
  getLink(link) {
    const {path} = FlowRouter.current();
    const {user, student} = this.props;
    const {total_submissions, target_stats} = student || {};
    let count = 0;
    if (link.href === '/') {
      count = total_submissions;
    } else if(target_stats) {
      target_stats.map((result) => {
        if (link.name.toLowerCase() === result.target_name) {
          count = result.total_submissions
        }
      });
    }
		className = "";
    if (path === link.href) {
      className += 'active';
    }
    return (
      <li key={link.name}>
        <a className={className}
          onClick={() => { if (user && !link.disabled) { FlowRouter.go(link.href)} } }>
					{link.name}{count ? <span className="badge">{count}</span> : null }
				</a>
      </li>
    );
  },
  render() {
		let leftLinks = [];
    const {user, student} = this.props;
		if (user) {
			leftLinks = [
				{ name: 'ASST1', href: '/asst1' },
				{ name: 'All', href: '/' },
				].map(this.getLink);
		}
		let rightLinks = [];
		if (user) {
			rightLinks = [
				{ name: 'Manual', href: '/test161' },
				{ name: 'Profile', href: '/profile' },
			].map(this.getLink);
		} else {
			rightLinks = [
				{ name: 'Manual', href: '/test161' }
			].map(this.getLink);
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
								<ul className="nav navbar-nav left">
									{leftLinks}
								</ul>
							</div>
							<div className="col-sm-6">
								<ul className="nav navbar-nav right">
									<LoginOutComponent {...this.props}/>
									{rightLinks}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
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
