import {MainComponent} from './main';

class OnloadComponent extends MainComponent {
  onload() {
    if ((typeof processPage !== 'undefined') && (typeof processPage === 'function')) {
      /*eslint-disable */
      processPage();
      /*eslint-enable */
    } else {
      setTimeout(this.onload, 1000);
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
