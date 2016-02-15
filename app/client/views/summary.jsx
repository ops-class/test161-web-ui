SummaryComponent = React.createClass({
  render() {
    const {student} = this.props;
    const {email, target_results} = student;
    let scores = target_results.map(result => {
      console.log(result);
      let {
        score: points_earned,
        max_score: points_avail,
        target_name: asst,
        submission_time,
        target_type,
        completion_time,
        status,
        performance,
        submission_id
      } = result;
      if (!points_earned) {
        points_earned = 0;
      }
      return {asst, points_avail, points_earned};
    });
    scores.push({
      asst: 'fake asst2', points_avail: 100, points_earned: randomInt(100)
    }, {
      asst: 'fake asst3', points_avail: 100, points_earned: randomInt(100)
    });
    const list = scores.map(score => {
      const {points_earned, points_avail, asst} = score;
      const className = getPointClass(score);
      return (
        <tr key={asst} className={className}>
          <td>{asst}</td>
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
})
