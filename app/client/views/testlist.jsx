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
    console.log(this.props);
    console.log(tests);
    const list = testList.map(test => <TestComponent key={test._id} {...test} />);
    return (
      <div className="row">
        {list}
      </div>
    );
  }
});

TestComponent = React.createClass({
  render() {
    const {_id, name, commands, points_avail, points_earned} = this.props;
    return (
      <div className="col-md-12">
        <p>{_id}</p>
        <p>{name}</p>
        <p>{points_earned}/{points_avail}</p>
        <CommandListComponent {...this.props} />
      </div>
    );
  }
})
