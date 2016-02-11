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
  toggleList() {
    console.log(arguments);
    console.log(this);
    const ele = $(ReactDOM.findDOMNode(this));
    const container = ele.find('.output-container');
    console.log(container);
    container.toggleClass('fadeOut')
    // container.slideToggle(300);
    // ele.toggleClass('active');
  },
  render() {
    const {_id, output, points_avail, points_earned, status} = this.props;
    const {collapse} = this.state;
    let list = null;
    if (status === commandStatus[1] || !collapse) {
      list = output.map(line =>
        <div key={_id+line.line} className="col-md-12">{line.line}</div>);
    }
    if (list) {
      list = (
        <div className="output-container animated bounceInLeft">
          {list}
        </div>
      );
    }
    return (
      <div>
        <div className="col-md-12">commands: {_id}</div>
        <div onClick={this.toggleCollapse} className="col-md-12">{status}</div>
        <div onClick={this.toggleList} className="col-md-12">{points_earned}/{points_avail}</div>
        {list}
      </div>
    );
  }
});
