OnloadMixin = {
  onload() {
    if ((typeof processPage !== 'undefined') && (typeof processPage === 'function')) {
      processPage();
    }
  },
  componentDidMount() {
    this.onload();
  },
  componentDidUpdate(){
    this.onload();
  }
}
