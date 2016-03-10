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

const MemberComponent = ({name, link, email}) => {
  return (
    <strong>
      {link ?
        <a href={link} target="_blank"
        data-toggle={email ? "tooltip" : null}
        title={email ? email : null}>{name}</a>
        :
        <span data-toggle={email ? "tooltip" : null}
          title={email ? email : null}>{name}</span>
      }
    </strong>
  );
}

const GroupComponent = React.createClass({
  render() {
    const { group } = this.props;
    const list = [];
    let first = true;
    group.map((member, index) => {
      if (first) {
        first = false;
      } else {
        list.push(<span key={index*2}> and </span>);
      }
      list.push(<MemberComponent {...member} key={index*2+1}/>);
    })
    return (<div>{list}</div>);
  }
});

const PerfectScoreComponent = React.createClass({
  componentDidMount() {
    this.initTooltip();
  },
  componentDidUpdate() {
    this.initTooltip();
  },
  initTooltip() {
    $(ReactDOM.findDOMNode(this)).find('[data-toggle="tooltip"]').tooltip();
  },
  render() {
    const {leaders} = this.props;
    if (!leaders || leaders.length === 0) {
      return null;
    }
    const list = leaders.map((leader, index) => (
      <li key={index} className="h5"> <GroupComponent {...leader}/> </li>
    ));
    return (
      <div className="test161-fixed-height-container">
        <ol>
          {list}
        </ol>
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
        { sort: { score : -1, submission_time: -1 } }
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
    const {target: {points = 0}} = this.props;
    scores.sort((a, b) => a - b);
    const max = Math.max(points, scores[scores.length - 1]);
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
        marginLeft: 60,
        marginRight: 10,
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
        showLastLabel: true,
        endOnTick: true,
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
    const {target: {_id, print_name: title}} = this.props;
    const {ready, loading, leaders} = this.data
    if (!ready) {
      return (<LoadingComponent />);
    } else {
      return (
        <div className="row" id={_id}>
          <div className="col-md-12">
            <h1>{title}</h1>
            <div className="alert alert-success text-center" role="alert">
              <span className="h3">
                {leaders.length} group{leaders.length > 1 ? 's' : null} earned
                a perfect score on {title}!
              </span>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div id={this.state.container}></div>
              </div>
            </div>
            <div className="col-md-4">
              <PerfectScoreComponent {...{leaders}}/>
            </div>
          </div>
        </div>
      );
    }
  }
});
