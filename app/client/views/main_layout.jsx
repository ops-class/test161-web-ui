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

FooterComponent = React.createClass({
  render() {
    return (
      <div className="container">
        <div className="row footer">
          <div className="col-xs-12">
            <hr />
          </div>
          <div className="small col-xs-12 col-md-4 col-md-offset-4 text-center">
            Created 1/29/2016<br />
            Updated 2/2/2016
          </div>
        </div>
      </div>
    );
  }
});
