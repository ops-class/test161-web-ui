MainLayout = React.createClass({
  render() {
    return (
      <div>
        <NavigationComponent />
        <div id="content">
          <div className="container">
            {this.props.content}
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
});
