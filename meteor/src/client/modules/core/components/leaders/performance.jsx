import {Component} from 'react';
import ReactMixin from 'react-mixin';
import {TargetSubs} from 'client/modules/core/libs';
import {ButtonToggleMixin} from 'client/modules/core/components/mixins';
import {LeaderboardSubs} from 'client/modules/core/libs';
import {Leaders} from 'libs/collections';
import LoadingComponent from 'client/modules/core/components/loading';

const BINS = 10;

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
    let anchor = -1, order = 0, count = 1;
    const list = leaders.map(leader => {
      const {performance, group, _id} = leader;
      let notSame = performance > anchor;
      if (notSame) {
        anchor = performance;
        order += count;
        count = 1;
      } else {
        count++;
      }
      return (
        <tr key={_id}>
          {/*{notSame ? <td>{order}</td> : <td></td>}*/}
          <td>{order}</td>
          <td>{group[0].name}</td>
          <td>{group[1] && group[1].name}</td>
          <td>{performance}</td>
        </tr>
      )
    })
    return (
      <div>
        <p>
          Top <b>{leaders.length}</b> groups for {title}!
        </p>
        <div className="btn btn-default"
          disabled={disabled}
          onClick={this.toggle}>
          {hide ? 'Show' : 'Hide' } Details
        </div>
        <div ref="details" style={{"display": "none"}}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Group Member 1</th>
                <th>Member 2</th>
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
});

@ReactMixin.decorate(ReactMeteorData)
class PerformanceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: props.target._id + '-chart'
    };
  }

  getMeteorData() {
    const {target = {}} = this.props;
    const ready = false;
    const loading = true;
    let data = {ready, loading}
    const handle = LeaderboardSubs.subscribe('performance', target);
    if (handle.ready()) {
      const leaders = Leaders.find(
        { target: target._id },
        { sort: { performance: 1, submission_time: -1 } }
      ).fetch();
      data.leaders = leaders;
      data.performances = (Leaders.findOne({_id: target._id})||{}).performances;
      data.ready = true;
      data.loading = false;
    } else {
      data = {...this.data};
      data.loading = true;
    }
    return data;
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const {ready, performances} = this.data;
    if (!ready) {
      return;
    }
    if (!performances || performances.length === 0) {
      return;
    }
    const values = performances;
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
  }

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
  }

  render() {
    const {target = {}} = this.props;
    const title = target.print_name;
    const {ready, loading, leaders} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    return (
      <div className="row" id={target._id}>
        <div className="col-md-12">
          <h1>{title}</h1>
          <div id={this.state.container}></div>
        </div>
        <PerfectScoreComponent {...{title, leaders}}/>
      </div>
    );
  }
}

export default {PerformanceComponent};
