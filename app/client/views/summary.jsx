SummaryComponent = React.createClass({
  render() {
    console.log(this.props);
    const {student} = this.props;
    const {email} = student;
    const scores = [
      {asst: 'asst1', points_earned: 1, points_avail: 10},
      {asst: 'asst2', points_earned: 5, points_avail: 10},
      {asst: 'asst3', points_earned: 10, points_avail: 10}
    ]
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
