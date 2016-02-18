TestListComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const {tests} = this.props;
    const ready = false;
    let data = {ready};

    const handle = TestSubs.subscribe('tests', tests);
    if (handle.ready()) {
      let testList = tests.map(_id => Tests.findOne({_id}));
      data.testList = testList.filter(ele => !!ele);
      data.ready = true;
    } else {
      data = {...this.data};
    }
    return data;
  },
  render() {
    const {tests} = this.props;
    const {ready, testList} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    let list = (
      <div className="row test-container text-center">
        No content!
        <LoadingComponent />
      </div>
    );
    if (testList.length > 0) {
      list = testList.map(test => <TestComponent key={test._id} {...test} />);
    }
    return (
      <div className="col-md-12 detail-container">
        {list}
      </div>
    );
  }
});

TestComponent = React.createClass({
  mixins: [CollapseMixin],
  getInitialState() {
    return {collapseTarget: '.command-container'};
  },
  autoCollpase(nextProps) {
    const {result: status} = this.props;
    const nextStatus = nextProps.result;
    return isTestRunning(status) && !isTestRunning(nextStatus);
  },
  render() {
    const {_id, name, commands, points_avail, points_earned, result} = this.props;
    const {collapse} = this.state;

    let content = null;
    let toggleClass = 'toggle fa ';
    const statusClass = getTestStatusClass(result);

    if (isTestRunning(result) || !collapse) {
      content = (<CommandListComponent {...this.props} />);
      toggleClass += 'fa-chevron-down';
    } else {
      toggleClass += 'fa-chevron-right';
    }

    let points = null;
    if (points_avail) {
      points = (
        <div className="col-md-2 col-xs-12 col-sm-12 ellipsis text-right">
          <PointComponent {...{points_earned, points_avail}} />
        </div>
      );
    }

    return (
      <div className={`row test-container ${statusClass}`}>
        <div className="col-md-1 col-xs-1 col-sm-1 toggle-container"
          onClick={this.toggleCollapse}>
          <i className={toggleClass}></i>
        </div>
        <div className="col-md-9 col-xs-12 col-sm-12 ellipsis">
          {name}
        </div>
        {points}
        {content}
      </div>
    );
  }
})
