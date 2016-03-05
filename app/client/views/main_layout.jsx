MainLayout = React.createClass({
  mixins: [ReactMeteorData, OnloadMixin],
  getMeteorData() {
    return subscribeUserData();
  },
  render() {
    let mainContent = <LoadingComponent />;
    if (this.data.ready) {
      mainContent = (<ContentComponent {...Object.assign(this.data, this.props)} />)
    }
    return (
      <div>
        <NavigationComponent />
        {mainContent}
      </div>
    );
  }
});
