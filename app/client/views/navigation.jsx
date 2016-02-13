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
                    <li><a id="menu-slides" title="Lecture slides, notes, and videos." href="https://www.ops-class.org/slides/" target="_blank">lectures</a>
                    </li>
                    <li>
                      <a id="menu-exams" title="Exams to test your knowledge of OS concepts." href="https://www.ops-class.org/exams/" target="_blank">exams</a>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" id="menu-courses" title="Courses that have used ops-class.org" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">courses</a>
                      <ul className="dropdown-menu">
                        <li><a href="https://www.ops-class.org/courses/buffalo/CSE421_Spring2016" target="_blank">UB CSE 421/521 Spring 2016</a></li>
                        <li role="separator" className="divider" />
                        <li>
                          <a href="https://www.ops-class.org/courses/buffalo/CSE421_Spring2015" target="_blank">UB CSE 421/521 Spring 2015</a>
                        </li>
                        <li>
                          <a href="https://www.ops-class.org/courses/buffalo/CSE421_Spring2014" target="_blank">UB CSE 421/521 Spring 2014</a>
                        </li>
                        <li>
                          <a href="https://www.ops-class.org/courses/buffalo/CSE421_Spring2013" target="_blank">UB CSE 421/521 Spring 2013</a>
                        </li>
                        <li>
                          <a href="https://www.ops-class.org/courses/buffalo/CSE421_Spring2012" target="_blank">UB CSE 421/521 Spring 2012</a>
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
                        <li><a href="https://www.ops-class.org/asst/0/" target="_blank">ASST0</a></li>
                        <li><a href="https://www.ops-class.org/asst/1/" target="_blank">ASST1</a></li>
                        <li><a href="https://www.ops-class.org/asst/2/" target="_blank">ASST2</a></li>
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