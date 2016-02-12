SubmissionListComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const {asst, user} = this.props;
    const {limit} = this.state;
    const ready = false;
    const loading = true;
    let data = {ready, asst, user, loading}
    const handle = SubmissionSubs.subscribe('submissions', asst, limit);
    if (handle.ready()) {
      data.submissions = findAllSubmissions(user._id, asst, limit).fetch();
      data.ready = true;
      data.loading = false;
    } else {
      data = {...this.data};
      data.loading = true;
    }
    return data;
  },
  getInitialState() {
    return {limit: 10};
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.asst !== nextProps.asst) {
      this.setState({limit: 10});
    }
  },
  componentDidMount() {
    $(window).scroll(() => {
      const $elem = $(ReactDOM.findDOMNode(this)).find('#load-more');

      const $window = $(window);

      const docViewTop = $window.scrollTop();
      const docViewBottom = docViewTop + $window.height();

      const elemTop = $elem.offset().top;
      const elemBottom = elemTop + $elem.height();

      const loadMore = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
      if (loadMore) {
        this.increaseLimit();
      }
    });
  },
  increaseLimit() {
    let {limit} = this.state;
    if (!this.data.loading) {
      limit += 10;
      this.setState({limit});
    }
  },
  render() {
    const {submissions, ready, user, asst, loading} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    if (submissions.length === 0) {
      return <div>You haven't submit any solution for {asst}</div>
    }
    const list = submissions.map(submission =>
      <SubmissionComponent key={submission._id} submission={submission} />);
    return (
      <div className="list-group">
        {list}
        <div className="list-group-item">
          <div id="load-more">
            {loading ? <LoadingComponent /> : null}
          </div>
        </div>
      </div>
    );
  }
});

const StatusComponent = ({status, score, max_score}) => {
    let className = 'text-uppercase alert ';
    let content = status;
    if (isSubmitted(status)) {
      className += "alert-warning";
    } else if (isCompleted(status)) {
      content = `${score}/${max_score}`;
      className += "alert-success";
    } else if (isFailed(status)) {
      className += "alert-danger";
    }
    return (
      <div className={className}>
        {content}
      </div>
    );
};

const InfoComponent = ({_id, submission_time, users, repository, commit_id, status, target_name, target_type, max_score, tests, completion_time, score, performance}) => {
  const className="col-md-12 ellipsis";
  const userStr = users.join(', ');
  return (
    <div className="row">
      <div className={className}>
        <p>{repository}</p>
      </div>
      <div className={className}>
        <p>{userStr}</p>
      </div>
      <div className={className}>
        <p>{commit_id}</p>
      </div>
    </div>
  );
};

const TimeComponent = ({submission_time, completion_time, commit_id}) => {
  const submission = moment(submission_time);
  const time = submission.fromNow();
  let duration = '--:--';
  if (completion_time) {
    duration = moment.duration(moment(completion_time).diff(submission)).format('h[:]mm:ss', { forceLength: true });
  }
  return (
    <div className="row">
      <div className="col-md-6 col-xs-6">
        <i className="fa fa-calendar"></i> {time}
      </div>
      <div className="col-md-6 col-xs-6">
        <i className="fa fa-clock-o"></i> {duration}
      </div>
      <div className="col-md-6 col-xs-6">
      </div>
      <div className="col-md-6 col-xs-6">
        <i className="fa fa-code-fork"></i> {commit_id.substring(0, 7)}
      </div>
    </div>
  )
};

SubmissionComponent = React.createClass({
  mixins: [CollapseMixin],
  getInitialState() {
    return {collapseTarget: '.submission-details'};
  },
  render() {
    const {submission} = this.props;
    const {collapse} = this.state;
    let details = null;
    if (!collapse) {
      details = (
        <div className="row submission-details">
          <TestListComponent {...submission}/>
        </div>
      );
    }
    return (
      <div className="list-group-item submission-container animated bounceIn">
        <div className="row submission-bar">
          <div onClick={this.toggleCollapse} className="col-md-2">
            <StatusComponent {...submission} />
          </div>
          <div className="col-md-6">
            <InfoComponent {...submission} />
          </div>
          <div className="col-md-4">
            <TimeComponent {...submission} />
          </div>
        </div>
        {details}
      </div>
    );
  }
});
