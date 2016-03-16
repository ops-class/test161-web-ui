const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../submissionlist';

describe('core.actions.submissionlist', () => {
  describe('currentLimit', () => {
    it('should return 10 if first time called', () => {
      const LocalState = {set: spy(), get: stub().returns(null)};
      const limit = actions.currentLimit({LocalState});

      expect(LocalState.get.callCount).to.be.equal(1);
      expect(LocalState.get.args[0]).to.deep.equal([ 'LIMIT' ]);

      expect(LocalState.set.callCount).to.be.equal(1);
      expect(LocalState.set.args[0]).to.deep.equal([ 'LIMIT', 10 ]);

      expect(limit).to.be.equal(10);
    });

    it('should return current limit', () => {
      const LocalState = {set: spy(), get: stub().returns(42)};
      const limit = actions.currentLimit({LocalState});

      expect(LocalState.get.callCount).to.be.equal(1);
      expect(LocalState.get.args[0]).to.deep.equal([ 'LIMIT' ]);

      expect(limit).to.be.equal(42);
    });
  });

  describe('increaseLimit', () => {
    it('do nothing if length is null', () => {
      const LocalState = {set: spy(), get: stub().returns(null)};
      actions.increaseLimit({LocalState}, null);

      expect(LocalState.get.callCount).to.be.equal(1);
      expect(LocalState.get.args[0]).to.deep.equal([ 'LIMIT' ]);

      expect(LocalState.set.callCount).to.be.equal(0);
    });

    it('do nothing if length !== current limit', () => {
      const LocalState = {set: spy(), get: stub().returns(null)};
      actions.increaseLimit({LocalState}, 1);

      expect(LocalState.get.callCount).to.be.equal(1);
      expect(LocalState.get.args[0]).to.deep.equal([ 'LIMIT' ]);

      expect(LocalState.set.callCount).to.be.equal(0);
    });

    it('increase 10 if length === current limit', () => {
      const limit = 42;
      const LocalState = {set: spy(), get: stub().returns(limit)};
      actions.increaseLimit({LocalState}, limit);

      expect(LocalState.get.callCount).to.be.equal(1);
      expect(LocalState.get.args[0]).to.deep.equal([ 'LIMIT' ]);

      expect(LocalState.set.callCount).to.be.equal(1);
      expect(LocalState.set.args[0]).to.deep.equal([ 'LIMIT', limit + 10 ]);
    });

    it('increase to 20 if length === 10', () => {
      const LocalState = {set: spy(), get: spy()};
      actions.increaseLimit({LocalState}, 10);

      expect(LocalState.get.callCount).to.be.equal(1);
      expect(LocalState.get.args[0]).to.deep.equal([ 'LIMIT' ]);

      expect(LocalState.set.callCount).to.be.equal(1);
      expect(LocalState.set.args[0]).to.deep.equal([ 'LIMIT', 20 ]);
    });
  });

  describe('clearLimit', () => {
    it('should clear LIMIT local state', () => {
      const LocalState = {set: spy()};
      actions.clearLimit({LocalState});
      expect(LocalState.set.callCount).to.be.equal(1);
      expect(LocalState.set.args[0]).to.deep.equal([ 'LIMIT', null ]);
    });
  });
});
