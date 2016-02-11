CommandListComponent = React.createClass({
  render() {
    const {_id, name, commands, points_avail, points_earned} = this.props;
    const list = commands.map(cmd => <CommandComponent key={cmd._id} {...cmd}/>);
    return (
      <div className="row">
        <div className="col-md-12">Commands list begin</div>
        {list}
      </div>
    );
  }
});

CommandComponent = React.createClass({
  mixins: [CollapseMixin],
  render() {
    const {_id, output, points_avail, points_earned, status} = this.props;
    const {collapse} = this.state;
    let list = null;
    if (status === commandStatus[1] || !collapse) {
      list = output.map(line =>
        <div key={_id+line.line} className="col-md-12">{line.line}</div>);
    }
    return (
      <div>
        <div className="col-md-12">commands: {_id}</div>
        <div onClick={this.toggleCollapse} className="col-md-12">{status}</div>
        <div className="col-md-12">{points_earned}/{points_avail}</div>
        {list}
      </div>
    );
  }
});
