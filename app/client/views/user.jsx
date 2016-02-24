mainContentClass = 'col-md-8 col-md-offset-2';

UserComponent = React.createClass({
  render() {
    const {params: {path}, profile, user, student} = this.props;
    if (pathIsIntro(path) || !user) {
      return (<IntroComponent />);
    }
    if (pathIsProfile(path)) {
      return (<ProfileComponent {...this.props}/>);
    }
    return (
      <div className="row">
        <div className={mainContentClass}>
          <SummaryComponent {...this.props} />
          <div className="row">
            <SubmissionListComponent {...this.props}/>
          </div>
        </div>
        <SidebarComponent {...this.props}/>
      </div>
    );
  }
});

SidebarComponent = React.createClass({
  render() {
    const {student} = this.props;
    if (!student) {
      return (<div>Error, student not found, this should not happen!</div>);
    }
    const {target_stats} = student;
    const {path} = FlowRouter.current();
    const list = target_stats.map((stat) => {
      const {target_name} = stat;
      let className = 'h5';
      const href = `/${target_name}`;
      if (path === href) {
        className += ' active';
      }
      return (
        <li key={target_name}
          className={className}>
          <a href={href}>
            {target_name.toUpperCase()}
          </a>
        </li>
      );
    })
    const sideStyle = {
      'paddingTop': '20px',
      'paddingRight': '10px'
    }
    return (
      <div id="scrollspy" className="col-md-2 spelling_exception">
        <ul id="side"
          className="nav hidden-xs hidden-sm affix"
          style={sideStyle}
          data-spy="affix">
          {list}
        </ul>
      </div>
    );
  }
});
