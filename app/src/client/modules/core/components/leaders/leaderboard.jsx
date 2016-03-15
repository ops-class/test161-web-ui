import {Component} from 'react';
import {PerformanceComponent} from './performance';

import AssignmentContainer from 'client/modules/core/containers/assignment';

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
          <PerformanceComponent {...this.props}/>
        }
        <hr/>
      </div>
    );
  }
}

export default {LeaderboardComponent};
