const {describe, it} = global;
import {expect} from 'chai';
import {mount} from 'enzyme';
import {CommandListComponent} from '../commandlist';


describe('core.components.commandlist.commandlist', () => {
  it('should has detail-container', () => {
    expect(CommandListComponent).to.not.equal(undefined);
    const wrapper = mount(<CommandListComponent commands={[]} />);
    expect(wrapper.find('.detail-container')).to.have.length(1);
  });
});
