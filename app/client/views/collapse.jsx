CollapseMixin = {
  getInitialState() {
    const collapse = true;
    return {collapse};
  },
  toggleCollapse() {
    let {collapse} = this.state;
    collapse = !collapse;
    this.setState({collapse})
  }
}
