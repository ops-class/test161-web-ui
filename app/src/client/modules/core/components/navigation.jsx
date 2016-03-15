import {Component} from 'react';

class NavigationComponent extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={this.props} />
    );
  }
}

export default {NavigationComponent};
