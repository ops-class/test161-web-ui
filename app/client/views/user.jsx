UserComponent = React.createClass({
  render() {
    const {asst, profile} = this.props;
    if (profile) {
      return (<ProfileComponent />);
    }
    return (
      <div>
        <div className="row">
        user information summary!
        </div>
        <div className="row">
          <SubmissionListComponent {...this.props}/>
        </div>
      </div>
    );
  }
})
