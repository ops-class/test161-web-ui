import {OnloadComponent} from './mixins';
import NavigationContainer from '../containers/navigation';

import {ContentComponent} from './content';

import './styles/default.less';

class MainLayout extends OnloadComponent {
  componentDidMount() {
    this.props.loadSiteJS();
  }

  render() {
    return (
      <div>
        <NavigationContainer />
        <ContentComponent {...this.props} />
      </div>
    );
  }
}

export default {MainLayout};
