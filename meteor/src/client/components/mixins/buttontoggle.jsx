const ButtonToggleMixin = {
  getInitialState() {
    return {hide: true};
  },
  toggle() {
    this.setState({disabled: true});
    $(this.getToggleTarget()).slideToggle(512,
      () => {
        this.setState({hide: !this.state.hide});
        this.setState({disabled: false});
      }
    );
  },
}

export default {ButtonToggleMixin};
