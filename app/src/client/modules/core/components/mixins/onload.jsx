import {MainComponent} from './main';

class OnloadComponent extends MainComponent {
  onload() {
    if ((typeof processPage !== 'undefined') && (typeof processPage === 'function')) {
      /*eslint-disable */
      processPage();
      /*eslint-enable */
    }
  }

  componentDidMount() {
    super.componentDidMount();
    this.onload();
  }

  componentDidUpdate() {
    this.onload();
  }
}

export default {OnloadComponent};
