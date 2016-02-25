LeaderboardComponent = React.createClass({
  render() {
    const {params: {target}} = this.props;
    const data = [];
    for (let i = 50; i > 40; i--) {
      const score = i;
      const group = `testdata-${i}@buffalo.edu, ${Random.id(8)}@buffalo.edu`
      data.push({group, score});
    }
    const list = [];
    for (let [index, elem] of data.entries()) {
      list.push(
        <tr key={index + 1}>
          <th>{index + 1}</th>
          <td>{elem.group}</td>
          <td>{elem.score}</td>
        </tr>
      );
    }
    return (
      <div className="row">
        <div className={mainContentClass}>
          <div className="row">
            <div className="col-md-12">
              <h1>{target}</h1>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Group</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {list}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
