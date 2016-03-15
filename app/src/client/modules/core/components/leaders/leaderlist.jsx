import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

class MemberComponent extends Component {
  render() {
    const {name, link, email} = this.props;
    return (
      <strong>
        {link ?
          <a href={link} target="_blank"
          data-toggle={email ? 'tooltip' : null}
          title={email ? email : null}>{name}</a> :
          <span data-toggle={email ? 'tooltip' : null}
            title={email ? email : null}>{name}</span>
        }
      </strong>
    );
  }
}

class GroupComponent extends Component {
  render() {
    const { group } = this.props;
    const list = [];
    let first = true;
    group.map((member, index) => {
      if (first) {
        first = false;
      } else {
        list.push(', ');
      }
      list.push(<MemberComponent {...member} key={index}/>);
    });
    return (<div>{list}</div>);
  }
}

class LeaderListComponent extends Component {
  componentDidMount() {
    this.initTooltip();
  }

  componentDidUpdate() {
    this.initTooltip();
  }

  initTooltip() {
    $(ReactDOM.findDOMNode(this))
    .find('[data-toggle="tooltip"]')
    .tooltip({trigger: 'hover', placement: 'auto'})
    .bind('touchstart', function () {
      $(this).tooltip('show');
    }).bind('touchend', function () {
      Meteor.setTimeout(() => $(this).tooltip('destroy'), 1024);
    });
  }

  render() {
    const {leaders} = this.props;
    if (!leaders || leaders.length === 0) {
      return null;
    }
    const list = leaders.map((leader, index) => (
      <li key={index} className="h5"> <GroupComponent {...leader}/> </li>
    ));
    return (
      <div className="test161-fixed-height-container">
        <ol>
          {list}
        </ol>
      </div>
    );
  }
}

export default {LeaderListComponent};
