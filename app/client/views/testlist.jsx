TestListComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const {tests} = this.props;
    const ready = false;
    const data = {ready};

    const handle = TestSubs.subscribe('tests', tests);
    if (handle.ready()) {
      let testList = tests.map(_id => Tests.findOne({_id}));
      data.testList = testList.filter(ele => !!ele);
      // console.log(tests.length, data.testList.length);
      data.ready = true;
    }
    return data;
  },
  render() {
    const {tests} = this.props;
    const {ready, testList} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    let list = <div>No content</div>;
    if (testList.length > 0) {
      list = testList.map(test => <TestComponent key={test._id} {...test} />);
    }
    return (
      <div className="row">
        {list}
      </div>
    );
  }
});

TestComponent = React.createClass({
  mixins: [CollapseMixin],
  render() {
    const {_id, name, commands, points_avail, points_earned, status} = this.props;
    const {collapse} = this.state;
    let content = null;
    if (status === testStatus[0] || !collapse) {
      content = <CommandListComponent {...this.props} />;
    }
    return (
      <div className="col-md-12">
        <p>{_id}</p>
        <p>{name}</p>
        <p onClick={this.toggleCollapse}>{status}</p>
        <p>{points_earned}/{points_avail}</p>
        {content}
      </div>
    );
  }
})
