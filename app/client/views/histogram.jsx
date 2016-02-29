HistogramComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    // const {target} = this.props;
    const target = {_id: 'asst1', type: 'asst'};
    const ready = false;
    const loading = true;
    let data = {ready, loading}
    const handle = StatisticsSubs.subscribe('statistics', target);
    if (handle.ready()) {
      const {scores = []} = Statistics.findOne({_id: target._id}) || {};
      data.scores = scores
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
  update() {
    const {ready, scores} = this.data;
    if (!ready) {
      return;
    }
    if (!scores || scores.length === 0) {
      return;
    }
    scores.sort((a, b) => a - b);
    let labels = [], counts = [], prev = -1;
    for (let i of scores) {
      if (i !== prev) {
        labels.push(i);
        counts.push(1);
      } else {
        counts[counts.length - 1]++;
      }
      prev = i;
    }
    this.plotlybar({labels, counts});
    this.chartjs({labels, counts});
    this.chartist({labels, counts});
    this.google({labels, counts});
    this.highcharts({labels, counts});
  },
  highcharts({labels, counts}) {
    var chart1 = new Highcharts.Chart({
      chart: {
        renderTo: 'highcharts',
        type: 'column'
      },
      title: {
        text: 'Statistics for Assignment 1'
      },
      xAxis: {
        title: {
          text: 'Scores'
        },
        categories: labels
      },
      yAxis: {
        title: {
          text: 'Number of groups'
        }
      },
      plotOptions: {
        series: {
          pointPadding: 0,
          groupPadding: 0,
          borderWidth: 0,
          shadow: false
        }
      },
      series: [{
        showInLegend: false,
        name: 'Groups',
        data: counts
      }]
    });
  },
  google({labels, counts}) {
    const array = [['Score', 'Number']];
    for (let i = 0; i < labels.length; i++) {
      array.push([labels[i], counts[i]]);
    }
    var data = google.visualization.arrayToDataTable(array);

    var options = {
      title: 'Statistics for Assignment 1',
      legend: { position: 'none' },
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('google'));
    chart.draw(data, options);
  },
  chartist({labels, counts}) {
    var data = {
      labels: labels,
      series: [
        counts
      ]
    };

    var options = {
      low: 0,
      axisX: {
      }
    };

    new Chartist.Bar('#chartist', data, options);
  },
  chartjs({labels, counts}) {
    const ctx = document.getElementById("chartjs").getContext("2d");
    var data = {
      labels: labels,
      datasets: [
        {
          label: 'scores',
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: counts
        }
      ]
    };
    const options = {
      scaleShowHorizontalLines: false,
      scaleShowVerticalLines: false,
      barValueSpacing: 1,
      scaleBeginAtZero: true,
      responsive: true,
      maintainAspectRatio: true
    }
    var myBarChart = new Chart(ctx).Bar(data, options);
  },
  plotlybar({labels, counts}) {
    const data = [
      {
        x: labels,
        y: counts,
        type: 'bar'
      }
    ];
    const layout = {
      bargap: 0.00,
      title: "Statistics for Assignment 1",
      xaxis: {
        title: 'Scores',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        title: 'Number of groups',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    };
    Plotly.newPlot('plotly-bar', data, layout);
  },
  render() {
    return (
      <div className="col-md-12">
        <h1>Demo for assignment 1</h1>
        <canvas id='chartjs'></canvas>
        <div id="highcharts"></div>
        <div id="plotly-bar"></div>
        <div id="google"></div>
        <div id="chartist"></div>
      </div>
    );
  }
});
