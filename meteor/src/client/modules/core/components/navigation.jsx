import {Component} from 'react';
import navigation from 'html!./navigation.txt';

class NavigationComponent extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: navigation}} />
    );
  }
}

export default {NavigationComponent };
