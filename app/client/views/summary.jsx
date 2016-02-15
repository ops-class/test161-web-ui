SummaryComponent = React.createClass({
  render() {
    console.log(this.props);
    const {student} = this.props;
    const {email } = student;
    return (
      <div className="row">
        {email}
      </div>
    );
  }
})
