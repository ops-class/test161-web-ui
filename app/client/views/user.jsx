UserComponent = React.createClass({
  render() {
    return (
      <div>
        <div className="row">
          user information summary!
        </div>
        <div className="row">
          <SubmissionListComponent {...this.props}/>
        </div>
      </div>
    )
  }
})
