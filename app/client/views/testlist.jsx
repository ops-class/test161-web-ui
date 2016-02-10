TestList = React.createClass({
  render() {
    const {tests} = this.props;
    console.log(this.props);
    console.log(tests);
    return (
      <div className="row">TestList</div>
    )
  }
})
