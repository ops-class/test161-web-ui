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
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <TabsComponent {...this.props} />
          </div>
        </div>
        {content}
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
    let className = 'btn btn-default btn-block ';
    if (path === link.href) {
      className += 'btn-primary ';
    }
    if (!user || link.disabled) {
      className += 'disabled ';
      link.disabled = true;
    }
    let containerClass = 'col-xs-4 col-md-2 test161-tabs-item';
    return (
      <div key={link.name}
        className={containerClass}>
        <div
          className={className}
          onClick={() => { if (user && !link.disabled) { FlowRouter.go(link.href)} } }>
          {link.name} {count ?
            <span className="badge">{count}</span>
            :
            null
          }
        </div>
      </div>
    );
  },
  render() {
    const leftLinks = [
      { name: 'All', href: '/', count: 4 },
      { name: 'ASST1', href: '/asst1', count: 4 },
      { name: 'Manual', href: '/test161' },
      { name: 'Profile', href: '/profile' },
    ].map(this.getLink);
    const rightLinks = [
      { name: 'Menu', href: '/menu' },
      { name: 'Profile', href: '/profile' },
    ].map(this.getLink);
    return (
			<div className="container">
        <nav className="navbar navbar-default navbar-second-top">
          <a className="logo-fixed hidden-md hidden-lg"href="https://www.ops-class.org/">
						<img src="/img/logos/ops-class.jpg" alt="ops-class.org logo" />
					</a>
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <div className="row">
                <div className="col-sm-6">
                  <ul className="nav navbar-nav left">
									{leftLinks}
									</ul>
								</div>
                <div className="col-sm-6">
                  <ul className="nav navbar-nav right">
									<LoginOutComponent {...this.props}/>
									</ul>
								</div>
							</div>
						</div>
					</div>
        </nav>
      </div>
    );
  }
});

LoginOutComponent = React.createClass({
  render() {
    const name = this.props.user ? 'Logout' : 'Login';
    const onClick = this.props.user ? logout : login;
    let className = 'btn btn-default btn-block '
    className += this.props.user ? 'btn-danger' : 'btn-success';
    return (
      <div className="col-xs-4 col-md-2 test161-tabs-item pull-right">
        <button className={className} onClick={onClick}>{name}</button>
      </div>
    );
  }
});
