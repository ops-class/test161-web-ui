ContentComponent = React.createClass({
  enforceLogin() {
    const {user} = this.props;
    if (!user) {
      login();
      // Meteor.lock.show({
      //   container: 'login-container'
      // });
    }
  },
  componentDidMount() {
    this.enforceLogin();
  },
  componentDidUpdate() {
    this.enforceLogin();
  },
  render() {
    const {user, asst} = this.props;
    const content = user ?
    (<UserComponent {...this.props}/>) :
    (
      <div className="row">
        <div className="col-md-12 text-center" id="login-container">Please login!</div>
      </div>
    );
    return (
      <div className="container">
        <div className="row">
          <div id="content" className="col-md-10 col-md-offset-1">
            <TabsComponent {...this.props} />
            {content}
          </div>
        </div>
      </div>
    );
  }
});

TabsComponent = React.createClass({
  getLink(link) {
    const {path} = FlowRouter.current();
    const {user} = this.props;
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
          {link.name} {link.count ?
            <span className="badge">{link.count}</span>
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
      { name: 'ASST1', href: '/asst/1', count: 4 },
      // { name: 'asst2', href: '/asst/2', disabled: true },
      // { name: 'asst3', href: '/asst/3', disabled: true },
      { name: 'Menu', href: '/menu' },
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
