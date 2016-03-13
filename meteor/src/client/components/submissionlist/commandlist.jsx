import {Component} from 'react';
import ReactMixin from 'react-mixin';
import {CollapseMixin} from 'client/components/mixins';
import {PointComponent} from 'client/components/points';

import {TestSubs} from 'client/libs';
import {Tests} from 'libs/collections';
import {isCommandRunning, getCommandStatusClass} from 'libs/';

const CommandListComponent = React.createClass({
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

const CommandComponent = React.createClass({
  mixins: [CollapseMixin],
  getInitialState() {
    return {collapseTarget: '.output-container'};
  },
  autoCollpase(nextProps) {
    const {status} = this.props;
    const nextStatus = nextProps.status;
    return isCommandRunning(status) && !isCommandRunning(nextStatus);
  },
  render() {
    const {_id, input, output, points_avail, points_earned, status} = this.props;
    const {collapse} = this.state;

    let list = null;
    let toggleClass = 'toggle fa ';
    const statusClass = getCommandStatusClass(status);

    if (isCommandRunning(status) || !collapse) {
      const content = output.map(line => line.line).join('\n');
      list = (
        <div className="col-xs-12 output-container">
          <pre>
            <code className="bash">
              {content}
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
        <div className="col-md-3 col-xs-12 col-sm-12 ellipsis text-right">
          <PointComponent {...{points_earned, points_avail}} />
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

export default {CommandListComponent};
