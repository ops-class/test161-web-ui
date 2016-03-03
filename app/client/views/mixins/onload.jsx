OnloadMixin = {
  componentDidMount() {
    try { processPage(); } catch (err) {};
  },
  componentDidUpdate(){
    try { processPage(); } catch (err) {};
  }
}
