const touchToHover = (event) => {$(event).toggleClass('hover')}

SubmissionListComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const {params: {path: asst}, user} = this.props;
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
  scroll() {
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
  },
  componentDidMount() {
    $(window).scroll(this.scroll);
  },
  componentWillUnmount() {
    $(window).unbind('scroll');
  },
  increaseLimit() {
    let {limit} = this.state;
    const {loading, submissions} = this.data;
    const num = submissions.length || 0;
    if (!loading && num === limit) {
      limit += 10;
      this.setState({limit});
    }
  },
  render() {
    const {submissions, ready, user, asst, loading} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    const length = submissions.length;
    if (length === 0) {
      return <div>You haven’t submitted any solutions!</div>
    }

    let noMoreSubmission = null;
    const {limit} = this.state;
    if (!loading && length < limit && limit > 10) {
      noMoreSubmission = (
        <div className="alert alert-warning">
        No more submissions!
        </div>
      );
    }
    const list = submissions.map(submission =>
      <SubmissionComponent key={submission._id} submission={submission} />);
    return (
      <div className="list-group">
        {list}
        <div id="load-more">
          {loading ? <LoadingComponent /> : null}
        </div>
        {noMoreSubmission}
      </div>
    );
  }
});

const StatusComponent = ({status, score, max_score}) => {
    let className = 'submission-status toggle text-uppercase hvr-grow-shadow alert ';
    let content = status;
    if (score) {
      content = `${score}/${max_score}`;
    }
    className += getSubmissionStatusClass({status, score});
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

const TimeComponent = React.createClass({
  getInitialState() {
    return {now: moment()};
  },
  componentDidMount() {
    this.updateDate();
  },
  updateDate() {
    const {submission_time, status} = this.props;
    const submission = moment(submission_time);
    const now = moment();

    this.setState({now});

    if (isSubmissionRunning(status)) {
      this.timer = setTimeout(this.updateDate, 1000);
    } else {
      const interval = getInterval(now.diff(submission));
      this.timer = setTimeout(this.updateDate, interval);
    }
  },
  componentWillUnmount() {
    clearTimeout(this.timer);
  },
  render() {
    const {submission_time, completion_time, commit_id, status} = this.props;
    const {now} = this.state;
    const submission = moment(submission_time);
    const time = submission.from(now, true);
    let duration = '--:--';
    if (isSubmissionRunning(status)) {
      duration = getDurationString(moment(now).diff(submission));
    } else {
      if (completion_time) {
        duration = getDurationString(moment(completion_time).diff(submission));
      }
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
  }
});

SubmissionComponent = React.createClass({
  mixins: [CollapseMixin],
  getInitialState() {
    return {collapseTarget: '.submission-details'};
  },
  autoCollpase(nextProps) {
    const {submission} = this.props;
    const nextSubmission = nextProps.submission;
    if (!submission || !nextSubmission) {
      return false;
    }
    const {status} = submission;
    const nextStatus = nextSubmission.status;
    return isSubmissionRunning(status) && !isSubmissionRunning(nextStatus);
  },
  render() {
    const {submission} = this.props;
    const {status} = submission;
    const {collapse} = this.state;
    let details = null;
    if (isSubmissionRunning(status) || !collapse) {
      details = (
        <div className="row submission-details">
          <TestListComponent {...submission}/>
        </div>
      );
    }
    return (
      <div className="list-group-item submission-container animated fadeIn">
        <div onTouchStart={touchToHover}
          onTouchEnd={touchToHover}
          className="row submission-bar">
          <div onClick={this.toggleCollapse} className="col-md-2 status-container">
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
