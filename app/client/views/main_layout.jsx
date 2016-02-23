MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return subscribeUserData();
  },
  componentDidMount: function() {
    processPage();
  },
  componentDidUpdate: function() {
    processPage();
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
