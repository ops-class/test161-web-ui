FooterComponent = React.createClass({
  render: function() {
    return (

      <div className="container">
        <div className="row" style={{marginTop: 10, marginBottom: 20}}>
          <div className="col-xs-12">
            <hr />
          </div>
          <div className="small col-xs-12 col-md-4 col-md-offset-4 text-center">
            Created 2/18/2016 <br />
            Updated 2/19/2016
          </div>
          <div className="small col-xs-12 col-md-4 text-center">
            <a href="https://github.com/ops-class/www/commits/master/src/asst/test161.adoc" target="_blank" className="external">File History</a> <br />
            <a href="https://github.com/ops-class/www/blob/master/src/asst/test161.adoc" target="_blank" className="external">View on Github</a>
          </div>
        </div>
      </div>
    );
  }
});