import {Component} from 'react';
import intro from 'html!./intro.txt';

class IntroComponent extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: intro}} />
    );
  }
}

export default {IntroComponent};
