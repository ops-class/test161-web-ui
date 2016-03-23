import {Component} from 'react';
import {LoadingComponent} from './loading';

class MainLoadingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {showIntro: false};
    this.showIntro = setTimeout(() => {
      this.setState({showIntro: true});
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout( this.showIntro );
  }

  render() {
    const {ready, content} = this.props;
    const {showIntro} = this.state;
    return (
      <div>
        {!ready ? <LoadingComponent /> : null}
        {showIntro || ready ? content : null}
      </div>
    );
  }
}

export {MainLoadingComponent};
