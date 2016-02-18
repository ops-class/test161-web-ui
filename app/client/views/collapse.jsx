CollapseMixin = {
  getInitialState() {
    const collapse = true;
    return {collapse};
  },
  componentWillReceiveProps(nextProps) {
    if (!nextProps) {
      return;
    }
    if (this.autoCollpase && this.autoCollpase(nextProps)) {
      this.delayCollapse();
    }
  },
  delayCollapse() {
    const ele = $(ReactDOM.findDOMNode(this));
    const container = ele.find(this.state.collapseTarget).first();
    if (container.is(':visible')) {
      this.setState(Object.assign(this.state, {collapse: false}));
      setTimeout(() => {
        this.toggleCollapse()
      }, 2048);
    }
  },
  toggleCollapse() {
    const ele = $(ReactDOM.findDOMNode(this));
    const container = ele.find(this.state.collapseTarget);
    if (container.length === 0) {
      this.setState(Object.assign(this.state, {collapse: false}));
    } else {
      const toggle = ele.find('.toggle').first();
      if (toggle.hasClass('fa')) {
        toggle.toggleClass('fa-chevron-right').toggleClass('fa-chevron-down');
      }
      container.slideToggle(512);
    }
  }
}
