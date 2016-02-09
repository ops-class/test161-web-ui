MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return subscribeUserData();
  },
  render() {
    const content = this.data.ready ? this.props.content : <LoadingComponent />;
    const {user} = this.data;
    return (
      <div>
        <NavigationComponent />
        <div id="content">
          <div className="container">
            <LoginOutComponent user={user} />
          </div>
          <div className="container">
            {content}
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
});

LoadingComponent = () => {
  return (
    <div>Loading</div>
  );
};

LoginOutComponent = React.createClass({
  render() {
    if (this.props.user) {
      return (
        <button onClick={logout} className="btn btn-lg btn-danger">Logout</button>
      );
    } else {
      return (
        <button onClick={login} className="btn btn-lg btn-primary">Login</button>
      );
    }
  }
});
