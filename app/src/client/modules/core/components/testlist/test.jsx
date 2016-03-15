import {CollapseComponent} from 'client/modules/core/components/mixins';
import {PointComponent} from 'client/modules/core/components/points';
import {CommandListComponent} from 'client/modules/core/components/commandlist';
import {getTestStatusClass, isTestRunning} from 'libs/';

class TestComponent extends CollapseComponent {
  constructor(props) {
    super(props);
    Object.assign(this.state, {collapseTarget: '.command-container'});
  }

  autoCollpase(nextProps) {
    const {result: status} = this.props;
    const nextStatus = nextProps.result;
    return isTestRunning(status) && !isTestRunning(nextStatus);
  }

  render() {
    const {name, points_avail, points_earned, result} = this.props;
    const {collapse} = this.state;

    let content = null;
    let toggleClass = 'toggle fa ';
    const statusClass = getTestStatusClass(result);

    if (isTestRunning(result) || !collapse) {
      content = (<CommandListComponent {...this.props} />);
      toggleClass += 'fa-chevron-down';
    } else {
      toggleClass += 'fa-chevron-right';
    }

    let points = null;
    if (points_avail) {
      points = (
        <div className="col-md-2 col-xs-12 col-sm-12 ellipsis text-right">
          <PointComponent {...{points_earned, points_avail}} />
        </div>
      );
    }

    return (
      <div className={`row test-container ${statusClass}`}>
        <div className="col-md-1 col-xs-1 col-sm-1 toggle-container"
          onClick={this.toggleCollapse.bind(this)}>
          <i className={toggleClass}></i>
        </div>
        <div className="col-md-9 col-xs-12 col-sm-12 ellipsis">
          {name}
        </div>
        {points}
        {content}
      </div>
    );
  }
}

export default {TestComponent};
