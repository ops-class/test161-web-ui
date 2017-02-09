import {CollapseComponent} from '../mixins';
import {PointComponent} from '../points';
import {CommandListComponent} from '../commandlist';
import {getTestStatusClass, isTestRunning} from 'lib/';

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
    const {name, points_avail, points_earned, result, target_name, sub_target_name} = this.props;
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

    // SDH 2/2017 - Filter out any tests that were not scored because of this target.
    // For example, we might have common dependencies between 2.1 and 2.2 so the tests
    // appear in both lists. But, the points might only apply to 2.1. Since the test is
    // shared between submissions, we would see the points in both places without explicitly
    // checking.
    var do_points = true
    if (target_name && sub_target_name != target_name && target_name.length > 0) {
        do_points = false
    }

    let points = null;
    if (points_avail && do_points) {
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

export {TestComponent};
