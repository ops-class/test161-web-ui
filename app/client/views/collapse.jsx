CollapseMixin = {
  getInitialState() {
    const collapse = true;
    return {collapse};
  },
  toggleCollapse() {
    const ele = $(ReactDOM.findDOMNode(this));
    const container = ele.find(this.state.collapseTarget);
    if (container.length === 0) {
      this.setState({collapse: false});
    } else {
      ele.find('.toggle').toggleClass('fa-chevron-right').toggleClass('fa-chevron-down');
      container.toggle();
    }
  }
}
