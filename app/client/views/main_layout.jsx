MainLayout = React.createClass({
  mixins: [ReactMeteorData, OnloadMixin],
  getMeteorData() {
    return subscribeUserData();
  },
  render() {
    return (
      <div>
        <NavigationComponent />
        <ContentComponent {...Object.assign(this.data, this.props)} />
      </div>
    );
  }
});
