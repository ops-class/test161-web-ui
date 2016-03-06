const getMyScore = (student, target_name) => {
  let res = -1;
  if (!student || !student.target_stats) {
    return res;
  }
  student.target_stats.map(result => {
    let {high_score, target_name: asst} = result;
    if (asst === target_name) {
      res = high_score;
    }
  });
  return res;
}

const PerfectScoreComponent = React.createClass({
  mixins: [ButtonToggleMixin],
  getToggleTarget() {
    return this.refs.details;
  },
  render() {
    const {leaders, title} = this.props;
    const {hide, disabled} = this.state;
    if (!leaders || leaders.length === 0) {
      return null;
    }
    const list = [];
    for (let [index, elem] of leaders.entries()) {
      let {score, group} = elem;
      list.push(
        <tr key={index + 1}>
          <td>{group}</td>
        </tr>
      );
    }
    return (
      <div>
        <p>
          There are total <b>{leaders.length}</b> groups get perfect score for {title}!
        </p>
        <div className="btn btn-default"
          disabled={disabled}
          onClick={this.toggle}>
          {hide ? 'Show' : 'Hide' } Details
        </div>
        <div ref="details" style={{"display": "none"}}>
          <table className="table table-striped">
            <tbody>
              {list}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

AssignmentComponent = React.createClass({
  mixins: [ReactMeteorData, UrlHashMixin],
  getMeteorData() {
    const {target} = this.props;
    const ready = false;
    const loading = true;
    let data = {ready, loading}
    const handle = LeaderboardSubs.subscribe('leaderboards', target);
    if (handle.ready()) {
      const leaders = Leaders.find(
        { target: target._id },
        { sort: { score : -1 } }
      ).fetch();
      data.scores = (Leaders.findOne({_id: target._id}) || {}).scores;
      data.leaders = leaders;
      data.ready = true;
      data.loading = false;
    } else {
      data = {...this.data};
      data.loading = true;
    }
    return data;
  },
  getInitialState() {
    const {target = {}} = this.props;
    return {
      container: target._id + '-chart'
    };
  },
  componentDidMount() {
    this.update();
  },
  componentDidUpdate() {
    this.update();
  },
  update() {
    const {ready, scores} = this.data;
    if (!ready) {
      return;
    }
    if (!scores || scores.length === 0) {
      return;
    }
    scores.sort((a, b) => a - b);
    const max = scores[scores.length - 1];
    let labels = [], counts = [], total = scores.length;
    for (let i = 0; i <= max; i++) {
      labels[i] = i;
      counts[i] = 0;
    }
    for (let i of scores) {
      counts[i]++;
    }
    for (let i = 0; i <= max; i++) {
      counts[i] = counts[i] / total * 100;
    }
    this.highcharts({labels, counts, total});
  },
  highcharts({labels, counts, total}) {
    const {target: { _id, type }} = this.props;
    const chartOptions = {
      chart: {
        renderTo: this.state.container,
        type: 'column'
      },
      title: {
        text: `Total submissions: ${total}`
      },
      xAxis: {
        title: {
          text: 'Scores'
        },
        categories: labels
      },
      yAxis: {
        title: {
          text: 'Percentage of Submissions'
        },
        labels: {
          format: '{value}%'
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          grouping: false,
          shadow: false,
          groupPadding: 0,
          pointPadding: 0,
          borderWidth: 0
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -16,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
      },
      tooltip: {
        useHTML: true,
        headerFormat: '<span>Score: {point.key}</span><br/>',
        valueDecimals: 2,
        valuePrefix: '',
        valueSuffix: ' %'
      },
      series: [{
        name: 'Groups',
        showInLegend: false,
        data: counts
      }]
    };
    const myScore = getMyScore(this.props.student, _id);
    if (myScore > -1) {
      const data = counts.map(x => 0);
      data[myScore] = counts[myScore];
      chartOptions.series.push({
        name: 'You',
        tooltip: {
          useHTML: true,
          pointFormat: 'You are here: <b>{point.y}</b><br/>'
        },
        showInLegend: true,
        color: 'rgba(136, 240, 119, 1)',
        data: data
      });
    }
    const chart = new Highcharts.Chart(chartOptions);
  },
  render() {
    const {target} = this.props;
    const {ready, loading, leaders} = this.data
    const title = target.print_name;
    if (!ready) {
      return (<LoadingComponent />);
    }
    return (
      <div className="row" id={target._id}>
        <h1>{title}</h1>
        <div id={this.state.container}></div>
        <PerfectScoreComponent {...{title, leaders}}/>
      </div>
    )
  }
});
