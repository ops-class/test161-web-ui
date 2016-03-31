import {Component} from 'react';
import {getPointClass} from '../points';

class SummaryComponent extends Component {
  render() {
    const {student} = this.props;
    const {target_stats = []} = student;
    if (target_stats.length === 0) {
      return null;
    }
    let scores = target_stats.map(result => {
      let {
        high_score: points_earned,
        max_score: points_avail,
        target_name: asst
      } = result;
      if (!points_earned) {
        points_earned = 0;
      }
      return {asst, points_avail, points_earned};
    });
    const list = scores.map(score => {
      const {points_earned, points_avail, asst} = score;
      const className = getPointClass(score);
      // TODO: fix this by either add print_name in target_stats or do some query in container
      return (
        <tr key={asst} className={className}>
          <td>{asst.toUpperCase()}</td>
          <td>{points_earned}/{points_avail}</td>
        </tr>
      );
    });
    return (
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Best Score</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
}

export default {SummaryComponent};
