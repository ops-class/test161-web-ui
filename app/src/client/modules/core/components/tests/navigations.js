const {describe, it} = global;
import {expect} from 'chai';
import {mount} from 'enzyme';
import {NavigationComponent} from '../navigation';

describe('core.components.navigation', () => {
  it('should contain the __html', () => {
    expect(NavigationComponent).to.not.equal(undefined);

    const text = 'navigation';
    const __html = `<div>${text}</div>`;

    const wrapper = mount(<NavigationComponent {...{__html}} />);

    expect(wrapper.props().__html).to.equal(__html);
    expect(wrapper.text()).to.be.equal(text);
  });
});
