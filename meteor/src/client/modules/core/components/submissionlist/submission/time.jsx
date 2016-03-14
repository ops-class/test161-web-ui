import React from 'react';
import {moment} from 'meteor/momentjs:moment';
import {getInterval, getDurationString} from 'client/modules/core/libs';
import {isSubmissionRunning} from 'libs/';

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

export default {TimeComponent};
