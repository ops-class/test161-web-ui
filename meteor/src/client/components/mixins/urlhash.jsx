const fixedTopHeight = 80;
let INITLOAD = true;

const UrlHashMixin = {
  componentDidUpdate() {
    let target = $(location.hash);
    if (target.length && INITLOAD) {
      $('html, body').animate({
        scrollTop: target.offset().top - fixedTopHeight
      }, 512);
      INITLOAD = false;
    }
  },
}

export default {UrlHashMixin};
