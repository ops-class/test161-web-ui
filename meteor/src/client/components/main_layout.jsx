import {Component} from 'react';
import ReactMixin from 'react-mixin';
import {OnloadMixin} from './mixins';

// export default for static content, it's easier for tojsx
import NavigationComponent from './navigation';
import {ContentComponent} from './content';
import {subscribeUserData} from 'client/libs';

import 'client/styles/default.less'

@ReactMixin.decorate(ReactMeteorData)
@ReactMixin.decorate(OnloadMixin)
export default class MainLayout extends Component {
  getMeteorData() {
    return subscribeUserData();
  }

  render() {
    return (
      <div>
        <NavigationComponent />
        <ContentComponent {...Object.assign(this.data, this.props)} />
      </div>
    );
  }
};
