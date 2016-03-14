import React from 'react';
import {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {moment} from 'meteor/momentjs:moment';
import {CollapseComponent} from 'client/modules/core/components/mixins';
import {LoadingComponent} from 'client/modules/core/components/loading';
import {isSubmissionRunning, getSubmissionStatusClass} from 'libs/';
import {HIDE, SHOW, ANONYMOUS} from 'libs/collections';
import {getInterval, getDurationString} from 'client/modules/core/libs';

import TestListComponent from 'client/modules/core/containers/testlist';

const touchToHover = (event) => $(event).toggleClass('hover');

class SubmissionListComponent extends Component {
  scroll() {
    const {data: {loading, submissions}} = this.props;
    if (loading) {
      return;
    }
    const $elem = $(this.refs.loadMore);

    const $window = $(window);

    const docViewTop = $window.scrollTop();
    const docViewBottom = docViewTop + $window.height();

    const elemTop = $elem.offset().top;
    const elemBottom = elemTop + $elem.height();

    const loadMore = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    if (loadMore) {
      this.props.increaseLimit(submissions.length);
    }
  }

  componentDidMount() {
    $(window).scroll(this.scroll.bind(this));
  }

  componentWillUnmount() {
    $(window).unbind('scroll');
  }

  render() {
    const {
      data: {submissions, ready, loading},
      student, currentLimit
    } = this.props;

    if (!ready) {
      return (<LoadingComponent />);
    }

    const length = submissions.length;
    if (length === 0) {
      return (<div>You haven’t submitted any solutions!</div>);
    }

    let noMoreSubmission = null;
    const limit = currentLimit();
    if (!loading && length < limit && limit > 10) {
      noMoreSubmission = (
        <div className="alert alert-warning">
          No more submissions!
        </div>
      );
    }

    const list = submissions.map(submission =>
      <SubmissionComponent key={submission._id}
        submission={submission}
        student={student} />);
    return (
      <div className="list-group">
        {list}
        <div ref="loadMore">
          {loading ? <LoadingComponent /> : null}
        </div>
        {noMoreSubmission}
      </div>
    );
  }
}

const StatusComponent = ({status, score, max_score, performance, target_type}) => {
  let className = 'submission-status toggle text-uppercase hvr-grow-shadow alert ';
  let content = status;
  if (target_type === 'asst') {
    if (score) {
      content = `${score}/${max_score}`;
    }
  } else {
    content = performance;
  }
  className += getSubmissionStatusClass({status, score});
  return (
    <div className={className}>
      {content}
    </div>
  );
};

const getPrivacyChoice = (email, {privacy = [], target_type, student}) => {
  let setting = privacy.find(x => x.type === email);
  if (setting && setting.choice) {
    return setting.choice;
  }
  if (student.email === email) {
    setting = (student.privacy || []).find(x => x.type === target_type);
    if (setting && setting.choice) {
      return setting.choice;
    }
    if (target_type === 'asst') {
      return HIDE;
    }
    return ANONYMOUS;
  }

  return 'Global';
};

const SelectComponent = React.createClass({
  getInitialState() {
    return {processing: false};
  },
  onClick(choice) {
    const {_id, student: {email, token}} = this.props;
    this.setState({processing: true});
    Meteor.call('updateSubmissionPrivacy', _id, {email, token, choice}, (err, res) => {
      this.setState({processing: false});
      if (err) {
        console.log(err, res);
      }
    });
  },
  render() {
    const {user, student: {email}} = this.props;
    const {processing} = this.state;
    const choice = getPrivacyChoice(user, this.props);
    return (
      <div className="col-md-12">
        <span className="target-type">
          {user}
        </span>
        <button type="button"
          className="btn btn-default dropdown-toggle target-btn"
          data-toggle="dropdown"
          aria-haspopup="true"
          disabled={email !== user}
          aria-expanded="false">
          {processing ? <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate">
          </span> : null} {choice} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu pull-right dropdown-menu-test161">
          <li><a onClick={this.onClick.bind(this, HIDE)}>{HIDE}</a></li>
          <li><a onClick={this.onClick.bind(this, ANONYMOUS)}>{ANONYMOUS}</a></li>
          <li role="separator" className="divider"></li>
          <li><a onClick={this.onClick.bind(this, SHOW)}>{SHOW}</a></li>
        </ul>
      </div>
    );
  }
});

const InfoComponent = React.createClass({
  render() {
    const {users, repository} = this.props;

    const className = 'col-md-12 ellipsis';
    const list = users.map((user, index) => {
      return (
        <SelectComponent {...this.props} key={`${user}-${index}`} user={user} />
      );
    });
    return (
      <div className="row">
        <div className={className}>
          <p>{repository}</p>
        </div>
        {list}
      </div>
    );
  }
});

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
    const time = submission.from(now);
    let duration = '--:--';
    if (isSubmissionRunning(status)) {
      duration = getDurationString(moment(now).diff(submission));
    } else if (completion_time) {
      duration = getDurationString(moment(completion_time).diff(submission));
    }
    const className = 'col-md-6 col-sm-12 col-xs-12';
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12">
          <i className="fa fa-calendar"></i> {time}
        </div>
        <div className={className}>
          <i className="fa fa-clock-o"></i> {duration}
        </div>
        <div className={className}>
          <i className="fa fa-code-fork"></i> {commit_id.substring(0, 7)}
        </div>
      </div>
    );
  }
});

class SubmissionComponent extends CollapseComponent {
  constructor(props) {
    super(props);
    Object.assign(this.state, {collapseTarget: '.submission-details'});
  }

  autoCollpase(nextProps) {
    const {submission} = this.props;
    const nextSubmission = nextProps.submission;
    if (!submission || !nextSubmission) {
      return false;
    }
    const {status} = submission;
    const nextStatus = nextSubmission.status;
    return isSubmissionRunning(status) && !isSubmissionRunning(nextStatus);
  }

  render() {
    const {submission, student} = this.props;
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
          <div onClick={this.toggleCollapse.bind(this)}
            className="col-md-2 status-container ellipsis">
            <StatusComponent {...submission} />
          </div>
          <div className="col-md-6">
            <InfoComponent {...submission} student={student} />
          </div>
          <div className="col-md-4">
            <TimeComponent {...submission} />
          </div>
        </div>
        {details}
      </div>
    );
  }
}

export default {SubmissionListComponent};
