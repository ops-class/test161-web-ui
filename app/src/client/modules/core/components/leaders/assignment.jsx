import {UrlHashComponent} from 'client/modules/core/components/mixins';
import {LoadingComponent} from 'client/modules/core/components/loading';
import {LeaderListComponent} from './leaderlist';

import Highcharts from 'highcharts/highstock';

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
};

class AssignmentComponent extends UrlHashComponent {
  constructor(props) {
    super(props);
    this.state = {
      container: props.target._id + '-chart'
    };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    super.componentDidUpdate();
    this.update();
  }

  update() {
    const {ready, scores} = this.props.data;
    if (!ready) {
      return;
    }
    if (!scores || scores.length === 0) {
      return;
    }
    const {target: {points = 0}} = this.props;
    scores.sort((a, b) => a - b);
    const max = Math.max(points, scores[scores.length - 1]);
    let labels = [];
    let counts = [];
    let total = scores.length;
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
  }

  highcharts({labels = [], counts}) {
    const interval = Math.floor(labels.length / 10);
    const {target: { _id }} = this.props;
    const chartOptions = {
      chart: {
        marginLeft: 60,
        marginRight: 10,
        renderTo: this.state.container,
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        title: {
          text: 'Scores'
        },
        labels: {
          style: {
            textOverflow: 'none'
          }
        },
        minTickInterval: interval,
        categories: labels
      },
      yAxis: {
        title: {
          text: 'Percentage of Submissions'
        },
        max: Math.max(...counts),
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
        backgroundColor: '#FFFFFF',
        shadow: true
      },
      tooltip: {
        useHTML: true,
        headerFormat: '<span>Score: {point.key}</span><br/>',
        valueDecimals: 2,
        valuePrefix: '',
        valueSuffix: ' %'
      },
      series: [ {
        name: 'Groups',
        showInLegend: false,
        data: counts
      } ]
    };
    const myScore = getMyScore(this.props.student, _id);
    if (myScore > -1) {
      const data = counts.map(() => 0);
      data[myScore] = counts[myScore];
      chartOptions.series.push({
        name: 'You',
        tooltip: {
          useHTML: true,
          pointFormat: 'You are here: <b>{point.y}</b><br/>'
        },
        showInLegend: true,
        color: 'rgba(136, 240, 119, 1)',
        data
      });
    }
    this.chart = new Highcharts.Chart(chartOptions);
  }

  render() {
    const {
      target: {_id, print_name: title, description, points},
      data: {ready, leaders = [], scores = []},
      getAsstLeaderTitle, getTargetLink
    } = this.props;
    if (!ready) {
      return (<LoadingComponent />);
    }
    const total = scores.filter(x => x === points).length;
    const length = leaders.length;
    const submissionsLen = scores.length;
    const submissionStr = submissionsLen <= 1 ? 'Submission' : 'Submissions';
    const link = getTargetLink(this.props.target);
    return (
      <div className="row" id={_id}>
        <div className="col-md-12">
          <h1><a href={link} target="_blank">{title}</a></h1>
          <p>
            {description} <a href={link} target="_blank">Read More</a>
          </p>
          <div className="col-md-7 col-sm-7">
            <h3 className="text-center">{submissionsLen} {submissionStr}</h3>
            <div className="row">
              <div id={this.state.container}></div>
            </div>
          </div>
          <div className="col-md-5 col-sm-5">
            {getAsstLeaderTitle({total, length})}
            <LeaderListComponent {...{leaders, total}}/>
          </div>
        </div>
      </div>
    );
  }
}

export default {AssignmentComponent};
