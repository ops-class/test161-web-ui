UserComponent = React.createClass({
  render() {
    const {asst, profile} = this.props;
    if (profile) {
      return (<ProfileComponent {...this.props}/>);
    }
    return (
      <div>
        <SummaryComponent {...this.props} />
        <div className="row">
          <SubmissionListComponent {...this.props}/>
        </div>
      </div>
    );
  }
})
