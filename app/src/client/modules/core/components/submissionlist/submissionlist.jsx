import {MainComponent} from 'client/modules/core/components/mixins';
import {LoadingComponent} from 'client/modules/core/components/loading';

import {SubmissionComponent} from './submission';

class SubmissionListComponent extends MainComponent {
  scroll() {
    const {data: {loading, submissions}} = this.props;
    if (loading) {
      return;
    }
    const $elem = $(this.refs.loadMore);

    const $window = $(window);

    const docViewTop = $window.scrollTop();
    const docViewBottom = docViewTop + $window.height();

    const elemTop = $elem.offset().top;
    const elemBottom = elemTop + $elem.height();

    const loadMore = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    if (loadMore) {
      this.props.increaseLimit(submissions.length);
    }
  }

  componentDidMount() {
    super.componentDidMount();
    $(window).bind('scroll.loadmore', this.scroll.bind(this));
  }

  componentWillUnmount() {
    $(window).unbind('scroll.loadmore');
  }

  render() {
    const {
      data: {submissions, ready, loading, showAll},
      student, currentLimit
    } = this.props;

    if (!ready) {
      return (<LoadingComponent />);
    }

    const length = submissions.length;
    if (length === 0) {
      return (<div>You haven’t submitted any solutions!</div>);
    }

    let noMoreSubmission = null;
    const limit = currentLimit();
    if (!loading && length < limit && limit > 10) {
      noMoreSubmission = (
        <div className="alert alert-warning">
          No more submissions!
        </div>
      );
    }

    return (
      <div className="list-group">
        {submissions.map(submission =>
          <SubmissionComponent key={submission._id}
            {...{submission, showAll, student}} />)}
        <div ref="loadMore">
          {loading ? <LoadingComponent /> : null}
        </div>
        {noMoreSubmission}
      </div>
    );
  }
}

export default {SubmissionListComponent};
