CommandListComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const ready = false;
    const data = {ready};

    const {commands} = this.props;
    const ids = commands.map(cmd => cmd._id);
    const handle = OutputSubs.subscribe('outputs', ids);
    if (handle.ready) {
      data.ready = true;
      data.outputs = commands.map(command => {
        const outputs = findAllOutputsWithId(command._id).fetch();
        return {command, outputs};
      });
    }
    return data;
  },
  render() {
    const {_id, name, commands, points_avail, points_earned} = this.props;
    const {ready, outputs} = this.data;
    let list = <LoadingComponent />;
    if (ready) {
      list = outputs.map(output => <CommandComponent key={output.command._id} {...output}/>);
    }
    return (
      <div className="row">
        <div className="col-md-12">Commands list begin</div>
        {list}
      </div>
    );
  }
});

CommandComponent = React.createClass({
  render() {
    const {command, outputs} = this.props;
    const {_id, points_avail, points_earned} = command;
    const list = outputs.map(output =>
       <div key={output._id} className="col-md-12">{output.line}</div>);
    return (
      <div>
        <div className="col-md-12">commands: {_id}</div>
        <div className="col-md-12">{points_earned}/{points_avail}</div>
        {list}
      </div>
    );
  }
});
