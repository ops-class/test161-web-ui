import {Component} from 'react';

class OnloadMixin extends Component {
  onload() {
    if ((typeof processPage !== 'undefined') && (typeof processPage === 'function')) {
      processPage();
    }
  }

  componentDidMount() {
    this.onload();
  }

  componentDidUpdate() {
    this.onload();
  }
}

export default {OnloadMixin};
