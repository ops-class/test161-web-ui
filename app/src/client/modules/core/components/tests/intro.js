const {describe, it} = global;
import {expect} from 'chai';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {IntroComponent} from '../intro';

describe('core.components.intro', () => {
  it('should contain the __html', () => {
    expect(IntroComponent).to.not.equal(undefined);

    const text = 'intro';
    const __html = `<div>${text}</div>`;

    const wrapper = mount(<IntroComponent {...{__html}} />);

    expect(wrapper.props().__html).to.equal(__html);
    expect(wrapper.text()).to.be.equal(text);
  });

  it('calls componentDidMount', () => {
    const text = 'intro';
    const __html = `<div>${text}</div>`;
    spy(IntroComponent.prototype, 'componentDidMount');

    mount(<IntroComponent {...{__html}} />);
    expect(IntroComponent.prototype.componentDidMount.calledOnce).to.be.equal(true);
    IntroComponent.prototype.componentDidMount.restore();
  });
});
