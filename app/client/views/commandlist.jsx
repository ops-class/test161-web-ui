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
  mixins: [ReactMeteorData],
  getMeteorData() {
    const {_id, points_avail, points_earned} = this.props;
    const ready = false;
    const data = {ready};

    const handle = OutputSubs.subscribe('outputs', _id);
    if (handle.ready) {
      data.outputs = findAllOutputsWithId(_id).fetch();
      data.ready = true;
    }
    return data;
  },
  render() {
    const {_id, points_avail, points_earned} = this.props;
    let list = <LoadingComponent />;
    if (this.data.ready) {
      // console.log(_id, this.data.outputs.length);
      list = this.data.outputs.map(output => <div key={output._id} className="col-md-12">{output.line}</div>);
    }
    return (
      <div>
        <div className="col-md-12">commands: {_id}</div>
        <div className="col-md-12">{points_earned}/{points_avail}</div>
        {list}
      </div>
    );
  }
});
