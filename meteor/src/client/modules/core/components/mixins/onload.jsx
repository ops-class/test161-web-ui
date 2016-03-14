import {Component} from 'react';

class OnloadComponent extends Component {
  onload() {
    if ((typeof processPage !== 'undefined') && (typeof processPage === 'function')) {
      /*eslint-disable */
      processPage();
      /*eslint-enable */
    }
  }

  componentDidMount() {
    this.onload();
  }

  componentDidUpdate() {
    this.onload();
  }
}

export default {OnloadComponent};
