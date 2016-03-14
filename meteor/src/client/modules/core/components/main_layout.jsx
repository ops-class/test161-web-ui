import {Component} from 'react';
import {OnloadMixin} from './mixins';

import NavigationComponent from './navigation';
import ContentComponent from './content';

import './styles/default.less'

class Layout extends OnloadMixin {
  render() {
    return (
      <div>
        <NavigationComponent />
        <ContentComponent {...this.props} />
      </div>
    );
  }
}

export default Layout;
