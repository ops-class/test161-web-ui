CommandListComponent = React.createClass({
  render() {
    const {_id, name, commands, points_avail, points_earned} = this.props;
    const list = commands.map(cmd => <CommandComponent key={cmd._id} {...cmd}/>);
    return (
      <div className="col-md-12 col-xs-12 col-sm-12 detail-container">
        {list}
      </div>
    )
  }
});

CommandComponent = React.createClass({
  mixins: [CollapseMixin],
  getInitialState() {
    return {collapseTarget: '.output-container'};
  },
  render() {
    const {_id, input, output, points_avail, points_earned, status} = this.props;
    const {collapse} = this.state;

    let list = null;
    let toggleClass = 'toggle fa ';
    const statusClass = getCommandStatusClass(status);

    if (isCommandRunning(status) || !collapse) {
      list = (
        <div className="col-xs-12 output-container">
          <pre>
            <code className="bash">
              {output.map(line =>
                <div key={_id+line.line} className="col-md-12">{line.line}</div>)}
            </code>
          </pre>
        </div>
      );
      toggleClass += 'fa-chevron-down';
    } else {
      toggleClass += 'fa-chevron-right';
    }
    let points = null;
    if (points_avail) {
      points = (
        <div className="col-md-3 col-xs-12 col-sm-12 text-right">
          {points_earned}/{points_avail}
        </div>
      );
    }
    return (
      <div className={`row command-container ${statusClass}`}>
        <div className="col-md-1 col-xs-1 col-sm-1 toggle-container"
          onClick={this.toggleCollapse}>
          <i className={toggleClass}></i>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 ellipsis">
          {input.line}
        </div>
        {points}
        {list}
      </div>
    );
  }
});
