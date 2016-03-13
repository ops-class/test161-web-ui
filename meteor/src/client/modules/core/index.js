import methodStubs from './configs/method_stubs';
import actions from './actions';
import routes from './routes.jsx';
import initContext from './configs';

export default {
  routes,
  actions,
  load(context) {
    initContext(context);
    methodStubs(context);
  }
};
