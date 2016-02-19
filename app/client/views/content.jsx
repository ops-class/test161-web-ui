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
          <div className="col-md-2">
            <TabsComponent {...this.props} />
          </div>
          <div id="content" className="col-md-10">
            {content}
          </div>
        </div>
      </div>
    );
  }
});

TabsComponent = React.createClass({
  componentDidMount() {
    const fixDiv = () => {
      const parent = $('#sidebar').parent();
      const sidebar = $('#sidebar');
      sidebar.css({
        'width': parent.width() + 30
      })
    }
    fixDiv();
    $(window).resize(fixDiv);
  },
  render() {
    const {path} = FlowRouter.current();
    const {user} = this.props;
    const links = [
      { name: 'All', href: '/' },
      { name: 'asst1', href: '/asst/1' },
      { name: 'asst2', href: '/asst/2', disabled: true },
      { name: 'asst3', href: '/asst/3', disabled: true },
      { name: 'Profile', href: '/profile' }].map((link) => {
        let className = 'btn btn-default btn-block ';
        if (path === link.href) {
          className += 'btn-primary ';
        }
        if (!user || link.disabled) {
          className += 'disabled ';
          link.disabled = true;
        }
        return (
          <div key={link.name}
            className="col-md-12 col-xs-12">
            <div
              type="button"
              className={className}
              onClick={() => { if (user && !link.disabled) { FlowRouter.go(link.href)} } }>
              {link.name}
            </div>
          </div>
        )
      }
    );
    return (
      <div className="row" id="sidebar">
        {links}
        <div className="divider"></div>
        <LoginOutComponent {...this.props}/>
      </div>
    );
  }
});

LoginOutComponent = React.createClass({
  render() {
    const name = this.props.user ? 'Logout' : 'Login';
    const onClick = this.props.user ? logout : login;
    const className = this.props.user ? 'btn btn-block btn-danger' : 'btn btn-block btn-success';
    return (
      <div className="col-md-12 col-xs-12">
        <button className={className} onClick={onClick}>{name}</button>
      </div>
    );
  }
});
