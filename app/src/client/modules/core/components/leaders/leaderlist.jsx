import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

class MemberComponent extends Component {
  render() {
    const {name, link, email} = this.props;

    const dataToggle = email ? 'tooltip' : null;
    let title = email ? email : '';
    if (link) {
      title += ' ' + link;
    }

    let content = null;
    if (link) {
      content = (
        <a href={link} target="_blank"
          data-toggle={dataToggle}
          title={title} >
          {name}
        </a>
      );
    } else if (email) {
      content = (
        <a href={`mailto:${email}`}
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
    const {total, leaders} = this.props;
    if (!leaders || leaders.length === 0) {
      return null;
    }

    let height = 400;
    if (total !== leaders.length) {
      height -= 39;
    }

    const style = {maxHeight: `${height}px`};

    const list = leaders.map(leader => (
      <li key={leader._id} className="h5"> <GroupComponent {...leader}/> </li>
    ));
    return (
      <div className="test161-fixed-height-container" style={style}>
        <ol style={{paddingLeft: '24px'}}>
          {list}
        </ol>
      </div>
    );
  }
}

export default {LeaderListComponent};
