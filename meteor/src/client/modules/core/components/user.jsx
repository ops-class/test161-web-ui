import {Component} from 'react';
import {
  pathIsProfile, pathIsIntro, pathIsLeaderboard, isStaff
} from 'client/modules/core/libs';

import IntroComponent from './intro';
import LoadingComponent from './loading';
import {ProfileComponent} from './settings';
import {SubmissionListComponent, SummaryComponent} from './submissionlist';
import {LeadersComponent} from './leaders';

import {mainContentClass} from './style';

const Intro = ({ready}) => (
  <div>
    {!ready ? <LoadingComponent /> : null}
    <IntroComponent />
  </div>
);

class UserComponent extends Component {
  render() {
    const {params: {path}, user} = this.props;
    if (pathIsIntro(path) || !user) {
      return (<Intro {...this.props} />);
    }
    if (pathIsProfile(path)) {
      return (<ProfileComponent {...this.props} />);
    }
    if (pathIsLeaderboard(path) && isStaff(user)) {
      return (<LeadersComponent {...this.props} />);
    }
    return (
      <div className="row">
        <div className={mainContentClass}>
          <SummaryComponent {...this.props} />
          <div className="row">
            <SubmissionListComponent {...this.props} />
          </div>
        </div>
        <SidebarComponent {...this.props} />
      </div>
    );
  }
}

class SidebarComponent extends Component {
  render() {
    const {student} = this.props;
    if (!student) {
      return (<div>Error, student not found, this should not happen!</div>);
    }
    const {target_stats = []} = student;
    const {path} = FlowRouter.current();
    const list = target_stats.map((stat) => {
      const {target_name, total_submissions} = stat;
      let className = 'h5';
      const href = `/${target_name}`;
      if (path === href) {
        className += ' active';
      }
      return (
        <li key={target_name}
          className={className}>
          <a href={href}>
            <span className="badge">{total_submissions}</span> {target_name.toUpperCase()}
          </a>
        </li>
      );
    })
    const sideStyle = {
      'paddingTop': '20px',
      'paddingRight': '10px'
    }
    return (
      <div id="scrollspy" className="col-md-2 spelling_exception">
        <ul id="side"
          className="nav hidden-xs hidden-sm affix"
          style={sideStyle}
          data-spy="affix">
          {list}
        </ul>
      </div>
    );
  }
}

export default UserComponent;
