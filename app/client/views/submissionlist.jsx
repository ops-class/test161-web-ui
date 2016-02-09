SubmissionListComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const {asst, user} = this.props;
    const ready = false;
    const data = {ready, asst, user}
    const handle = SubmissionSubs.subscribe('submissions', asst);
    if (handle.ready()) {
      data.submissions = findAllSubmissions(user._id, asst).fetch();
      data.ready = true;
    }
    return data;
  },
  render() {
    const {submissions, ready, user, asst} = this.data;
    if (!ready) {
      return <div>Loading...</div>
    }
    if (submissions.length === 0) {
      return <div>You haven't submit any solution for {asst}</div>
    }
    const list = submissions.map(submission =>
      <SubmissionComponent key={submission._id} submission={submission} />);
    return (
      <div className="list-group">
        {list}
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
  render() {
    const {submission} = this.props;
    return (
      <div className="list-group-item">
        <div className="row">
          <div className="col-md-2">
            <StatusComponent {...submission} />
          </div>
          <div className="col-md-6">
            <InfoComponent {...submission} />
          </div>
          <div className="col-md-4">
            <TimeComponent {...submission} />
          </div>
        </div>
      </div>
    );
  }
});
