import {Component} from 'react';
import ReactMixin from 'react-mixin';
import {OnloadMixin} from './mixins';

import NavigationComponent from './navigation';
import ContentComponent from './content';

import './styles/default.less'

@ReactMixin.decorate(OnloadMixin)
class Layout extends Component {
  render() {
    return (
      <div>
        <NavigationComponent />
        <ContentComponent {...this.props} />
      </div>
    );
  }
};

export default Layout;
