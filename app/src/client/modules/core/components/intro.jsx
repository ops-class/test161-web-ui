import {MainComponent} from 'client/modules/core/components/mixins';
import intro from 'html!./intro.txt';

class IntroComponent extends MainComponent {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: intro}} />
    );
  }
}

export default {IntroComponent};
