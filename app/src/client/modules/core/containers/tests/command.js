const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import {composer, depsMapper} from '../command';

describe('core.containers.command', () => {
  describe('composer', () => {
    it('should call getCommandStatusClass with status', () => {
      const getCommandStatusClass = stub().returns(42);
      const isCommandRunning = spy();
      const context = () => ({Libs: {getCommandStatusClass, isCommandRunning}});
      const status = 'status';

      composer({context, status}, spy());

      const args = getCommandStatusClass.args[0];

      expect(args).to.be.deep.equal([ status ]);
    });

    it('should call onData with null and {statusClass, isCommandRunning}', () => {
      const getCommandStatusClass = stub().returns(42);
      const isCommandRunning = spy();
      const context = () => ({Libs: {getCommandStatusClass, isCommandRunning}});
      const status = 'status';
      const onData = spy();

      composer({context, status}, onData);

      const args = onData.args[0];

      expect(args).to.be.deep.equal([ null, {isCommandRunning, statusClass: 42} ]);
    });
  });

  describe('depsMapper', () => {
    describe('context', () => {
      it('should map the whole context as a function', () => {
        const actions = {posts: {create: spy(), clearErrors: spy()}};
        const context = spy();

        const deps = depsMapper(context, actions);

        expect(deps.context()).to.be.equal(context);
      });
    });
  });
});
