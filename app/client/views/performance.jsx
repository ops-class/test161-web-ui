const BINS = 10;

PerformanceComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const {target = {}} = this.props;
    const ready = false;
    const loading = true;
    let data = {ready, loading}
    const handle = StatisticsSubs.subscribe('performance', target);
    if (handle.ready()) {
      const leaders = Leaders.find(
        { target: target._id },
        { sort: { performance: 1 } }
      ).fetch();
      data.leaders = leaders;
      data.ready = true;
      data.loading = false;
    } else {
      data = {...this.data};
      data.loading = true;
    }
    return data;
  },
  componentDidMount() {
    this.update();
  },
  componentDidUpdate() {
    this.update();
  },
  getInitialState() {
    const {target = {}} = this.props;
    return {
      container: target._id + '-chart'
    };
  },
  update() {
    const {ready, leaders} = this.data;
    if (!ready) {
      return;
    }
    if (!leaders || leaders.length === 0) {
      return;
    }
    const values = leaders.map(x => x.performance);
    const max = values[values.length - 1];
    const min = values[0];
    const interval = max / BINS;
    let labels = [], counts = [], total = values.length;
    for (let i = 0; i <= BINS; i++) {
      const lower = Math.round(i * interval * 100) / 100;
      const upper = Math.round((i + 1) * interval * 100) / 100;
      labels[i] = `>${lower} <=${upper}`
      counts[i] = 0;
    }
    for (let i of values) {
      const index = Math.floor(i / interval);
      counts[index]++;
    }
    for (let i = 0; i <= BINS; i++) {
      counts[i] = counts[i] / total * 100;
    }
    counts = counts.reverse();
    labels = labels.reverse();
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
          text: 'Performance'
        },
        // labels:{
        //   rotation: -90,
        // },
        // lineWidth: 0,
        // lineColor: '#999',
        // tickLength: 80,
        // tickColor: '#ccc',
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
        headerFormat: '<span>Performance: {point.key}</span><br/>',
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
    // const myScore = getMyScore(this.props.student, _id);
    // if (myScore > -1) {
    //   const data = counts.map(x => 0);
    //   data[myScore] = counts[myScore];
    //   chartOptions.series.push({
    //     name: 'You',
    //     tooltip: {
    //       useHTML: true,
    //       pointFormat: 'You are here: <b>{point.y}</b><br/>'
    //     },
    //     showInLegend: true,
    //     color: 'rgba(136, 240, 119, 1)',
    //     data: data
    //   });
    // }
    const chart = new Highcharts.Chart(chartOptions);
  },
  render() {
    const {ready, loading, leaders} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    let anchor = -1, order = 0;
    const list = leaders.map(leader => {
      const {performance, group, _id} = leader;
      let notSame = performance > anchor;
      if (notSame) {
        anchor = performance;
        order++;
      }
      return (
        <tr key={_id}>
          {/*{notSame ? <td>{order}</td> : <td></td>}*/}
          <td>{order}</td>
          <td>{group}</td>
          <td>{performance}</td>
        </tr>
      )
    })
    // console.log(leaders);
    return (
      <div className="row">
        <div className="col-md-12">
          <div id={this.state.container}></div>
        </div>
        <div className="col-md-12"
          ref="details">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Group</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
})
