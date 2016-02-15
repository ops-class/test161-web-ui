SummaryComponent = React.createClass({
  render() {
    const {student} = this.props;
    const {email, target_results} = student;
    let scores = [];
    for (let asst of Object.keys(target_results)) {
      let {
        score: points_earned,
        max_score: points_avail,
        status,
        performance,
        submission_id
      } = target_results[asst];
      if (!points_earned) {
        points_earned = 0;
      }
      scores.push({asst, points_avail, points_earned});
    }
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
