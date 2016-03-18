const {describe, it} = global;
// const {describe, it, before, beforeEach, afterEach} = global;
// import {expect} from 'chai';
// import {stub, spy} from 'sinon';
// import {mount} from 'enzyme';
// import {TestComponent} from '../test';

describe('core.components.testlist.test', () => {
  describe('static content', () => {
    it('should has test-container');
    it('should displays test name');
    it('should pass {points_earned, points_avail} to PointComponent');
  });

  describe('toggle', () => {
    describe('static content', () => {
      it('should has toggle-container');
      it('should collapse as default');
      it('should expand if test is running');
      it('has fa-chevron-down when expand');
      it('has fa-chevron-right when collapse');
    });

    describe('automatic change state', () => {
      it('should call autoCollapse when componentWillReceiveProps');
      it('should autoCollapse if current test is running and next is not running');
    });

    describe('button', () => {
      it('should creates commandlist view');
      it('should toggle commandlist view');
    });
  });
});
