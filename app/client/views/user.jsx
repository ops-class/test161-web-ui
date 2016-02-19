mainContentClass = 'col-md-10 col-md-offset-1';

UserComponent = React.createClass({
  render() {
    const {params: {path}, profile, user} = this.props;
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
      </div>
    );
  }
})
