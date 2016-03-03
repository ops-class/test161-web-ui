let INITLOAD = true;

const PerfectScoreComponent = React.createClass({
  getInitialState() {
    return {hide: true};
  },
  toggle() {
    this.setState({disabled: true});
    $(this.refs.details).slideToggle(512,
      () => {
        this.setState({hide: !this.state.hide});
        this.setState({disabled: false});
      }
    );
  },
  componentDidMount() {
    $(this.refs.details).hide();
  },
  render() {
    const {leaders, title} = this.props;
    const {hide, disabled} = this.state;
    if (!leaders || leaders.length === 0) {
      return null;
    }
    const list = [];
    for (let [index, elem] of leaders.entries()) {
      let {score, group} = elem;
      list.push(
        <tr key={index + 1}>
          <td>{group}</td>
        </tr>
      );
    }
    return (
      <div>
        <p>
          There are total <b>{leaders.length}</b> groups get perfect score for {title}!
        </p>
        <div className="btn btn-default"
          disabled={disabled}
          onClick={this.toggle}>
          {hide ? 'Show' : 'Hide' } Details
        </div>
        <div ref="details">
          <table className="table table-striped">
            <tbody>
              {list}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
})

const LeaderboardComponent = React.createClass({
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
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render() {
    const {target} = this.props;
    const {ready, loading, leaders} = this.data
    const title = target._id.toUpperCase();
    if (!ready) {
      return (<LoadingComponent />);
    }
    return (
      <div className="col-md-12 leaders-container" id={target._id}>
        <h1>{title}</h1>
        <HistogramComponent {...this.props}/>
        <PerfectScoreComponent {...{title, leaders}}/>
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
  render() {
    const {ready, loading, targets} = this.data;
    if (!ready) {
      return (<LoadingComponent />);
    }
    const list = targets.map((target) => {
      const {_id} = target;
      return (
        <LeaderboardComponent key={_id} target={target} student={this.props.student}/>
      );
    });
    return (
      <div className="row">
        <div className={mainContentClass}>
          <div className="col-md-12">
            <h1>Leaderboards</h1>
            <p>
              The leaderboards contain statistics information for all assignment
              and performance targets. Please note that the scores below does not
              reflect the actual scores you can get in your course. Because some
              of you may submit submission(s) with higher score after deadline.
              We just count your highest score and put it on the statistics board.
            </p>
            {list}
          </div>
        </div>
        <LeadersSidebarComponent targets={targets}/>
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
    const {targets} = this.props;
    const hash = location.hash;
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
