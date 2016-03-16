import {MainComponent} from './mixins';

class IntroComponent extends MainComponent {
  render() {
    return (
      <div dangerouslySetInnerHTML={this.props} />
    );
  }
}

export {IntroComponent};
