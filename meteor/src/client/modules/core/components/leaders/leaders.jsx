import {OnloadComponent} from 'client/modules/core/components/mixins';
import {LoadingComponent} from 'client/modules/core/components/loading';

import {LeadersSidebarComponent} from './leaderssidebar';
import {LeaderboardComponent} from './leaderboard';

import {mainContentClass} from 'client/modules/core/components/style';

class LeadersComponent extends OnloadComponent {
  render() {
    const {ready, targets} = this.props.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    const list = targets.map((target) => {
      return (
        <LeaderboardComponent key={target._id}
          target={target}
          student={this.props.student} />
      );
    });
    return (
      <div className="row" id="content">
        <div className={mainContentClass}>
          <div className="col-md-12">
            <h1>Leaderboards</h1>
            <p className="lead">
							Leaderboards display performance for all <code>test161</code>
              {" "}	assignment and performance targets.
						</p>
						<p>
							{" "}<strong>Please note that your score below does not necessarily
                reflect the score you will earn for your course, since you can
							continue to submit after your course's deadline.</strong>
							{" " }But regardless of your deadlines, your best score is always shown.
            </p>
            <div className="row">
              {list}
            </div>
          </div>
        </div>
        <LeadersSidebarComponent targets={targets}/>
      </div>
    );
  }
}

export default {LeadersComponent};
