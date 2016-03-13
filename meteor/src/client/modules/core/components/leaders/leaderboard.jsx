import {Component} from 'react';
import ReactMixin from 'react-mixin';
import {TargetSubs} from 'client/modules/core/libs';
import {OnloadMixin} from 'client/modules/core/components/mixins';
import LoadingComponent from 'client/modules/core/components/loading';
import {TargetNames} from 'libs/collections';

import {AssignmentComponent} from './assignment';
import {PerformanceComponent} from './performance';

import {mainContentClass} from 'client/modules/core/components/style';

const isAssignment = (type) => type === 'asst';

class LeaderboardComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const {target: {type}} = this.props;
    return (
      <div className="col-md-12" >
        { isAssignment(type) ?
          <AssignmentComponent {...this.props}/> :
          <PerformanceComponent {...this.props}/>
        }
        <hr/>
      </div>
    );
  }
}

@ReactMixin.decorate(ReactMeteorData)
@ReactMixin.decorate(OnloadMixin)
class LeadersComponent extends Component {
  getMeteorData() {
    const ready = false;
    const loading = true;
    let data = {ready, loading}

    const handle = TargetSubs.subscribe('targets');
    if (handle.ready()) {
      const targets = TargetNames.find(
        {},
        { sort: { type: -1, _id: 1 } }
      ).fetch();
      data.targets = targets;
      data.ready = true;
      data.loading = false;
    } else {
      data = {...this.data};
      data.loading = true;
    }
    return data;
  }

  render() {
    const {ready, loading, targets} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    const list = targets.map((target) => {
      const {_id} = target;
      return (
        <LeaderboardComponent key={_id} target={target} student={this.props.student}/>
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

class LeadersSidebarComponent extends Component {
  componentDidMount() {
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top - fixedTopHeight
            }, 512, () => {
              location.hash = this.hash;
            });
            return false;
          }
        }
      });
    });
  }

  render() {
    const {targets} = this.props;
    const hash = location.hash;
    const list = targets.map((target) => {
      const { _id, print_name } = target;
      let className = 'h5';
      const href = `#${_id}`;
      if (href === hash) {
        className += ' active';
      }
      return (
        <li key={_id}
          className={className}>
          <a href={href}>
            {print_name}
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
          data-spy="affix"
          style={sideStyle}>
          {list}
        </ul>
      </div>
    );
  }
}

export default {LeadersComponent}
