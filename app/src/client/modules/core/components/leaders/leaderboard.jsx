import {Component} from 'react';

import AssignmentContainer from 'client/modules/core/containers/assignment';
import PerformanceContainer from 'client/modules/core/containers/performance';

const isAssignment = (type) => type === 'asst';

class LeaderboardComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {target: {type}} = this.props;
    return (
      <div className="col-md-12" >
        { isAssignment(type) ?
          <AssignmentContainer {...this.props}/> :
          <PerformanceContainer {...this.props}/>
        }
        <hr/>
      </div>
    );
  }
}

export default {LeaderboardComponent};
