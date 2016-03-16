const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {mount} from 'enzyme';
import {CommandComponent} from '../command';

const getProps = () => {
  const input = {line: 'input'};
  const output = [ {line: 'output'} ];
  const points_avail = 50;
  const points_earned = 50;
  const status = 'status';
  const statusClass = 'status-class';
  const isCommandRunning = stub();
  return {
    input, output, points_avail, points_earned,
    status, statusClass, isCommandRunning
  };
};

describe('core.components.commandlist.command', () => {
  it('should has toggle-container', () => {
    expect(CommandComponent).to.not.equal(undefined);
    const wrapper = mount(<CommandComponent {...getProps()}/>);
    expect(wrapper.find('.toggle-container')).to.have.length(1);
  });

  it('should collapse as default', () => {
    const wrapper = mount(<CommandComponent {...getProps()}/>);
    expect(wrapper.find('.output-container')).to.have.length(0);
  });

  it('should expand if command is running', () => {
    const props = getProps();
    props.isCommandRunning = stub().returns(true);
    const wrapper = mount(<CommandComponent {...props}/>);
    expect(wrapper.find('.output-container')).to.have.length(1);
  });

  it('call autoCollapse when componentWillReceiveProps', () => {
    const wrapper = mount(<CommandComponent {...getProps()}/>);
    spy(CommandComponent.prototype, 'autoCollpase');
    wrapper.setProps();
    expect(CommandComponent.prototype.autoCollpase.calledOnce).to.equal(true);
  });

  it('should autoCollapse if current command is running and next is not running', () => {
    const props = getProps();
    const {isCommandRunning} = props;
    isCommandRunning.withArgs(props.status).returns(true);
    const wrapper = mount(<CommandComponent {...props}/>);
    expect(wrapper.find('.output-container')).to.have.length(1);

    const status = 'newStatus';
    isCommandRunning.withArgs(status).returns(false);
    wrapper.setProps({status});

    expect(isCommandRunning.callCount).to.equal(4);
    expect(isCommandRunning.args[0]).to.deep.equal([ props.status ]);
    expect(isCommandRunning.args[1]).to.deep.equal([ props.status ]);
    expect(isCommandRunning.args[2]).to.deep.equal([ status ]);
    expect(isCommandRunning.args[3]).to.deep.equal([ status ]);
  });

  it('toggle button should create output view', () => {
    const wrapper = mount(<CommandComponent {...getProps()}/>);
    expect(wrapper.state().collapse).to.equal(true);
    expect(wrapper.find('.output-container')).to.have.length(0);

    wrapper.find('.toggle-container').simulate('click');

    expect(wrapper.state().collapse).to.equal(false);
    expect(wrapper.find('.output-container')).to.have.length(1);
  });

  it('toggle button should toggle output view', function (done) {
    const props = getProps();
    props.isCommandRunning.returns(true);
    const wrapper = mount(<CommandComponent {...props}/>);
    expect(wrapper.state().collapse).to.equal(true);
    expect(wrapper.find('.output-container')).to.have.length(1);

    wrapper.find('.toggle-container').simulate('click');
    expect(wrapper.state().collapse).to.equal(true);
    expect(wrapper.find('.output-container').html()).to.contain('height: 1px');

    wrapper.find('.toggle-container').simulate('click');
    expect(wrapper.state().collapse).to.equal(true);
    setTimeout(() => {
      expect(wrapper.find('.output-container').html()).to.not.contain('height: 1px');
      done();
    }, 1024);
  });
});
