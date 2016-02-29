let INITLOAD = true;

LeaderboardComponent = React.createClass({
  componentDidUpdate() {
    let target = $(location.hash);
    if (target.length && INITLOAD) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 512);
      INITLOAD = false;
      return false;
    }
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    const {target} = this.props;
    const ready = false;
    const loading = true;
    let data = {ready, loading}
    const handle = LeaderboardSubs.subscribe('leaderboards', target);
    if (handle.ready()) {
      const leaders = Leaders.find(
        { target: target._id },
        { sort: { score : -1 } }
      ).fetch();
      data.leaders = leaders;
      data.ready = true;
      data.loading = false;
    } else {
      data = {...this.data};
      data.loading = true;
    }
    return data;
  },
  render() {
    const {target} = this.props;
    const {ready, loading, leaders} = this.data
    if (!ready) {
      return (<LoadingComponent />);
    }
    const list = [];
    for (let [index, elem] of leaders.entries()) {
      let {score, group} = elem;
      list.push(
        <tr key={index + 1}>
          <th>{index + 1}</th>
          <td>{group}</td>
          <td>{score}</td>
        </tr>
      );
    }
    return (
      <div className="col-md-12 leaders-container" id={target._id}>
        <h1>{target._id}</h1>
        <HistogramComponent {...this.props}/>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Group</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
});

LeadersComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const ready = false;
    const loading = true;
    let data = {ready, loading}

    const handle = TargetSubs.subscribe('targets');
    if (handle.ready()) {
      const targets = TargetNames.find(
        {},
        { sort: { _id: 1 } }
      ).fetch();
      data.targets = targets;
      data.ready = true;
      data.loading = false;
    } else {
      data = {...this.data};
      data.loading = true;
    }
    return data;
  },
  getInitialState() {
    return { hash: location.hash };
  },
  componentDidMount() {
    $(window).scroll(this.scroll);
  },
  componentWillUnmount() {
    $(window).unbind('scroll');
  },
  scroll() {
    const $elem = $(ReactDOM.findDOMNode(this)).find('.leaders-container');
    const $window = $(window);

    const docViewTop = $window.scrollTop();
    const docViewBottom = docViewTop + $window.height();

    for (let ele of $elem) {
      const elemTop = $(ele).offset().top;
      const elemBottom = elemTop + $(ele).height();

      const hash = `#${ele.id}`;
      const active = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
      if (active) {
        if (hash !== location.hash) {
          this.setState({hash: hash});
          if (history.pushState) {
            history.pushState(null, null, hash);
          } else {
            location.hash = hash;
          }
        }
        break;
      }
    }
  },
  render() {
    const {ready, loading, targets} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    const list = targets.map((target) => {
      const {_id} = target;
      return (
        <LeaderboardComponent key={_id} target={target}/>
      );
    });
    return (
      <div className="row">
        <div className={mainContentClass}>
          <div className="row">
            <h1>Test stage, only staff can see this page!</h1>
            <HistogramComponent />
            {list}
          </div>
        </div>
        <LeadersSidebarComponent targets={targets} hash={this.state.hash}/>
      </div>
    );
  }
});

LeadersSidebarComponent = React.createClass({
  componentDidMount() {
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 512, () => {
              location.hash = this.hash;
            });
            return false;
          }
        }
      });
    });
  },
  render() {
    const {targets, hash} = this.props;
    const list = targets.map((target) => {
      const { _id } = target;
      let className = 'h5';
      const href = `#${_id}`;
      if (href === hash) {
        className += ' active';
      }
      return (
        <li key={_id}
          className={className}>
          <a href={href}>
            {_id.toUpperCase()}
          </a>
        </li>
      );
    })
    const sideStyle = {
      'paddingTop': '20px',
      'paddingRight': '10px'
    }
    return (
      <div id="scrollspy" className="col-md-2 spelling_exception">
        <ul id="side"
          className="nav hidden-xs hidden-sm affix"
          style={sideStyle}
          data-spy="affix">
          {list}
        </ul>
      </div>
    );
  }
});
