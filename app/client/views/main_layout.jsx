MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return subscribeUserData();
  },
  render() {
    let mainContent = <LoadingComponent />;
    if (this.data.ready) {
      mainContent = (
        <div className="container">
          <TabsComponent {...this.data} />
          <div className="container">
            {this.props.content}
          </div>
        </div>
      )
    }
    return (
      <div>
        <NavigationComponent />
        <div id="content">
          {mainContent}
        </div>
        <FooterComponent />
      </div>
    );
  }
});

LoadingComponent = () => {
  return (
    <div>Loading</div>
  );
};

TabsComponent = React.createClass({
  render() {
    const {path} = FlowRouter.current();
    const {user} = this.props;
    const links = [
      { name: 'all', href: '/' },
      { name: 'asst1', href: '/asst/1' },
      { name: 'asst2', href: '/asst/2' },
      { name: 'asst3', href: '/asst/3' }].map((link) => {
        return (
          <li key={link.name}
            className={user ? null : 'disabled'}>
            <a href={link.href} className={user ? null : 'disabled'}>{link.name}</a>
          </li>
        )
      }
    );
    return (
      <div className="row">
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div id="navbar" className="navbar">
              <div className="row">
                <div className="col-sm-6">
                  <ul className="nav navbar-nav left">
                    {links}
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
    return (
      <li><a href="#" onClick={onClick}>{name}</a></li>
    );
  }
});
