import {CollapseComponent} from '../mixins';
import {PointComponent} from '../points';

class CommandComponent extends CollapseComponent {
  constructor(props) {
    super(props);
    Object.assign(this.state, {collapseTarget: '.output-container'});
  }

  autoCollpase(nextProps) {
    const {status, isCommandRunning} = this.props;
    const nextStatus = nextProps.status;
    return isCommandRunning(status) && !isCommandRunning(nextStatus);
  }

  render() {
    const {
      input, output, points_avail, points_earned,
      status, statusClass, isCommandRunning
    } = this.props;
    const {collapse} = this.state;

    let list = null;
    let toggleClass = 'toggle fa ';

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
          onClick={this.toggleCollapse.bind(this)}>
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
}

export {CommandComponent};
