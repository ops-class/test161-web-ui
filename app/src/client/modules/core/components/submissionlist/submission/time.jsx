import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {moment} from 'meteor/momentjs:moment';
import {getInterval, getDurationString} from 'client/modules/core/lib';
import {isSubmissionRunning} from 'lib/';

const TimeComponent = React.createClass({
  getInitialState() {
    return {now: moment()};
  },
  componentDidMount() {
    this.updateDate();
    this.initTooltip();
  },

  componentDidUpdate() {
    this.initTooltip();
  },

  initTooltip() {
    $(ReactDOM.findDOMNode(this))
    .find('[data-toggle="tooltip"]')
    .tooltip({trigger: 'hover', placement: 'auto'})
    .bind('touchstart', function () {
      $(this).tooltip('show');
    }).bind('touchend', function () {
      Meteor.setTimeout(() => $(this).tooltip('destroy'), 1024);
    });
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
  toggleSubmission() {
    const {_id, student: {email, token}, toggleSubmission} = this.props;
    toggleSubmission(_id, {email, token});
  },
  render() {
    const {
      submission_time, completion_time, commit_id, status,
      hide = false, showAll
    } = this.props;
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
          <div data-toggle="tooltip"
            title={submission.toString()}>
            <i className="fa fa-calendar"></i> {time}
          </div>
        </div>
        <div className={className}>
          <i className="fa fa-clock-o"></i> {duration}
        </div>
        <div className={className}>
          <i className="fa fa-code-fork"></i> {commit_id.substring(0, 7)}
        </div>
        {showAll ? (
          <div className="col-md-12">
            <button className="btn btn-default btn-block" onClick={this.toggleSubmission}>
              {hide ? 'show' : 'hide'}
            </button>
          </div>
        ) : null }
      </div>
    );
  }
});

export default {TimeComponent};
