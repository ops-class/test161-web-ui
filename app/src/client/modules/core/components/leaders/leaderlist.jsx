import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

class MemberComponent extends Component {
  render() {
    const {name, link, email} = this.props;

    const dataToggle = email ? 'tooltip' : null;
    const title = email ? email : null;

    let content = null;
    if (link) {
      content = (
        <a href={link} target="_blank"
          data-toggle={dataToggle}
          title={title} >
          {name}
        </a>
      );
    } else if (title) {
      content = (
        <a href={`mailto:${title}`}
          data-toggle={dataToggle}
          title={title}
          target="_top">
          {name}
        </a>
      );
    } else {
      content = (
        <span data-toggle={dataToggle}
          title={title} >
          {name}
        </span>
      );
    }
    return (
      <strong>
        {content}
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
