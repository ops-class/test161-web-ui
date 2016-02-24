MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return subscribeUserData();
  },
  componentDidMount: function() {
    try { processPage(); } catch (err) {};
  },
  componentDidUpdate: function() {
    try { processPage(); } catch (err) {};
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
