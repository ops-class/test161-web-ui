import {Component} from 'react';
import navigation from 'html!./navigation.txt';

export default class Layout extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: navigation}} />
    );
  }
}
