import {Component} from 'react';
import {LoadingComponent} from 'client/modules/core/components/loading';
import TestComponent from './test';

class TestListComponent extends Component {
  render() {
    const {data: {ready, testList}} = this.props;

    if (!ready) {
      return (<LoadingComponent />);
    }

    let list = (
      <div className="row test-container text-center">
        No content!
        <LoadingComponent />
      </div>
    );

    if (testList.length > 0) {
      list = testList.map(test => <TestComponent key={test._id} {...test} />);
    }

    return (
      <div className="col-md-12 detail-container">
        {list}
      </div>
    );
  }
}

export default {TestListComponent};
