import React from 'react';
import {Meteor} from 'meteor/meteor';
import {HIDE, SHOW, ANONYMOUS} from 'libs/collections';

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

export default {SelectComponent};
