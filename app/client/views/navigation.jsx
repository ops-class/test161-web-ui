NavigationComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return subscribeUserData();
  },
  render() {
    if (!this.data.ready) {
      return (<LoadingComponent />);
    }
    const asstLinks = [
      {name: "ASST0", href: "/asst/0"}
      // ,{name: "ASST1", href: "/asst/1"}
      // ,{name: "ASST2", href: "/asst/2"}
      // ,{name: "ASST3", href: "/asst/3"}
    ].map((link) => {
      return (<AsstLinkComponent key={link.name} link={link}/>);
    });

    const LoginoutButton = (<LoginOutComponent user={this.data.user}/>);
    return (
      <div className="container">
        <nav className="navbar navbar-default navbar-fixed-top">
          <a className="logo-fixed" href="/"><img src="/img/logos/ops-class.jpg" alt="ops-class.org logo"/></a>
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <div className="row">
                <div className="col-sm-6">
                </div>
                <div className="col-sm-6">
                  <ul className="nav navbar-nav right">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" id="menu-asst"
                         title="Hack the kernel! OS/161-based operating system assignments."
                         data-toggle="dropdown" role="button"
                         aria-haspopup="true" aria-expanded="false">assignments</a>
                      <ul className="dropdown-menu">
                        {asstLinks}
                      </ul>
                    </li>
                    <li><a id="menu-discuss"
                           title="Discourse-based course discussion forum."
                           target="_blank"
                           href="https://discourse.ops-class.org">discuss</a></li>
                    {LoginoutButton}
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

AsstLinkComponent = React.createClass({
  render() {
    const {name, href} = this.props.link;
    return (
      <li><a href={href}>{name}</a></li>
    );
  }
});

LoginOutComponent = React.createClass({
  render() {
    let [text, callback] = ["Login", login];
    if (this.props.user) {
      [text, callback] = ["Logout", logout];
    }
    return (
      <li onClick={callback}>
        <a href="#" title={text}>{text}</a>
      </li>
    );
  }
});
