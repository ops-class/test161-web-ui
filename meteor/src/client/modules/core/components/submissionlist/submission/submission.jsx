import {CollapseComponent} from 'client/modules/core/components/mixins';
import {StatusComponent} from './status';
import {TimeComponent} from './time';
import {InfoComponent} from './info';

import {isSubmissionRunning} from 'libs/';

import TestListContainer from 'client/modules/core/containers/testlist';

const touchToHover = (event) => $(event).toggleClass('hover');

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
          <TestListContainer {...submission}/>
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

export default {SubmissionComponent};
