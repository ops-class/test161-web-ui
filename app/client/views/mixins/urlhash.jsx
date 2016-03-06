fixedTopHeight = 80;
let INITLOAD = true;

UrlHashMixin = {
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
