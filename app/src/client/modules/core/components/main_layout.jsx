import {OnloadComponent} from './mixins';

import {NavigationComponent} from './navigation';
import {ContentComponent} from './content';

import './styles/default.less';

class MainLayout extends OnloadComponent {
  render() {
    return (
      <div>
        <NavigationComponent />
        <ContentComponent {...this.props} />
      </div>
    );
  }
}

export default {MainLayout};
