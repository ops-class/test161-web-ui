import {Component} from 'react';
import intro from 'html!./intro.txt';

export default class Layout extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: intro}} />
    );
  }
}
