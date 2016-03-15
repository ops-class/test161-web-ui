import {Component} from 'react';
import {AssignmentComponent} from './assignment';
import {PerformanceComponent} from './performance';

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
          <AssignmentComponent {...this.props}/> :
          <PerformanceComponent {...this.props}/>
        }
        <hr/>
      </div>
    );
  }
}

export default {LeaderboardComponent};
