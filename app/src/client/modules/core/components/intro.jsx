import {MainComponent} from 'client/modules/core/components/mixins';

class IntroComponent extends MainComponent {
  render() {
    return (
      <div dangerouslySetInnerHTML={this.props} />
    );
  }
}

export default {IntroComponent};
