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
      // { name: 'asst2', href: '/asst2', disabled: true },
      // { name: 'asst3', href: '/asst3', disabled: true },
      { name: 'Manual', href: '/test161' },
      { name: 'Profile', href: '/profile' },
    ].map(this.getLink);
    const rightLinks = [
      { name: 'Menu', href: '/menu' },
      { name: 'Profile', href: '/profile' },
    ].map(this.getLink);
    return (
      <div className="row">
        <div className="col-xs-12 test161-tabs">
          {leftLinks}
          <LoginOutComponent {...this.props}/>
        </div>
        {/*<div className="col-xs-6 pull-right">
          {rightLinks}
          <LoginOutComponent {...this.props}/>
        </div>*/}
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
