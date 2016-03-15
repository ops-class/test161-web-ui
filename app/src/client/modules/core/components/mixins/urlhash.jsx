import {Component} from 'react';
import {fixedTopHeight} from '../style';

let INITLOAD = true;

class UrlHashComponent extends Component {
  componentDidUpdate() {
    let target = $(location.hash);
    if (target.length && INITLOAD) {
      $('html, body').animate({
        scrollTop: target.offset().top - fixedTopHeight
      }, 512);
      INITLOAD = false;
    }
  }
}

export default {UrlHashComponent};
