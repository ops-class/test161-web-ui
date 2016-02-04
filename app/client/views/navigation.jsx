NavigationComponent = React.createClass({
  render: function() {
    return (

      <div className="container">
        <nav className="navbar navbar-default navbar-fixed-top">
          <a className="logo-fixed" href="/"><img src="/img/logos/ops-class.jpg" alt="ops-class.org logo" /></a>
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <div className="row">
                <div className="col-sm-6">
                  <ul className="nav navbar-nav left">
                    {/*
									<li><a id="menu-lectures"
											title="Lecture slides, notes, and videos."
											href="/lectures/">lectures</a>
									</li>
									*/}
                    <li>
                      <a id="menu-exams" title="Exams to test your knowledge of OS concepts." href="/exams/">exams</a>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" id="menu-courses" title="Courses that have used ops-class.org" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">courses</a>
                      <ul className="dropdown-menu">
                        <li><a href="/courses/buffalo/CSE421_Spring2016">UB CSE 421/521 Spring 2016</a></li>
                        <li role="separator" className="divider" />
                        <li>
                          <a href="/courses/buffalo/CSE421_Spring2015.pdf" target="_blank">UB CSE 421/521 Spring 2015 (PDF)</a>
                        </li>
                        <li>
                          <a href="/courses/buffalo/CSE421_Spring2014.pdf" target="_blank">UB CSE 421/521 Spring 2014 (PDF)</a>
                        </li>
                        <li>
                          <a href="/courses/buffalo/CSE421_Spring2013.pdf" target="_blank">UB CSE 421/521 Spring 2013 (PDF)</a>
                        </li>
                        <li>
                          <a href="/courses/buffalo/CSE421_Spring2012.pdf" target="_blank">UB CSE 421/521 Spring 2012 (PDF)</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <ul className="nav navbar-nav right">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" id="menu-asst" title="Hack the kernel! OS/161-based operating system assignments." data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">assignments</a>
                      <ul className="dropdown-menu">
                        <li><a href="/asst/0/">ASST0</a></li>
                      </ul>
                    </li>
                    <li><a id="menu-discuss" title="Discourse-based course discussion forum." target="_blank" href="https://discourse.ops-class.org" className="external">discuss</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});