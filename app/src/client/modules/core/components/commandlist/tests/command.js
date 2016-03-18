const {describe, it, before, beforeEach, afterEach} = global;
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
  let wrapper = null;
  let props = null;

  before(() => {
    expect(CommandComponent).to.not.equal(undefined);
  });

  beforeEach(() => {
    expect(wrapper).to.equal(null);
    expect(props).to.equal(null);
    props = getProps();
    wrapper = mount(<CommandComponent {...props}/>);
  });

  afterEach(() => {
    expect(wrapper).to.not.equal(null);
    expect(props).to.not.equal(null);
    wrapper = null;
    props = null;
  });

  it('should has toggle-container', () => {
    expect(wrapper.find('.toggle-container')).to.have.length(1);
  });

  it('should collapse as default', () => {
    expect(wrapper.find('.output-container')).to.have.length(0);
  });

  it('should expand if command is running', () => {
    props.isCommandRunning = stub().returns(true);
    wrapper = mount(<CommandComponent {...props}/>);
    expect(wrapper.find('.output-container')).to.have.length(1);
  });

  it('call autoCollapse when componentWillReceiveProps', () => {
    spy(CommandComponent.prototype, 'autoCollpase');
    wrapper.setProps();
    expect(CommandComponent.prototype.autoCollpase.calledOnce).to.equal(true);
  });

  it('should autoCollapse if current command is running and next is not running', () => {
    const {isCommandRunning} = props;
    isCommandRunning.withArgs(props.status).returns(true);
    wrapper = mount(<CommandComponent {...props}/>);
    expect(wrapper.find('.output-container')).to.have.length(1);

    const status = 'newStatus';
    isCommandRunning.withArgs(status).returns(false);
    wrapper.setProps({status});

    expect(isCommandRunning.callCount).to.equal(5);
    expect(isCommandRunning.args).to.deep.equal([
      [ props.status ],
      [ props.status ],
      [ props.status ],
      [ status ],
      [ status ]
    ]);
  });

  it('toggle button should create output view', () => {
    expect(wrapper.state().collapse).to.equal(true);
    expect(wrapper.find('.output-container')).to.have.length(0);

    wrapper.find('.toggle-container').simulate('click');

    expect(wrapper.state().collapse).to.equal(false);
    expect(wrapper.find('.output-container')).to.have.length(1);
  });

  it('has fa-chevron-down when expand', () => {
    wrapper.find('.toggle-container').simulate('click');
    expect(wrapper.find('.toggle').hasClass('fa-chevron-down')).to.equal(true);
  });

  it('has fa-chevron-right when collapse', () => {
    expect(wrapper.find('.toggle').hasClass('fa-chevron-right')).to.equal(true);
  });

  it('toggle button should toggle output view', function (done) {
    props = getProps();
    props.isCommandRunning.returns(true);
    wrapper = mount(<CommandComponent {...props}/>);

    expect(wrapper.state().collapse).to.equal(true);
    expect(wrapper.find('.output-container')).to.have.length(1);

    wrapper.find('.toggle-container').simulate('click');
    expect(wrapper.state().collapse).to.equal(true);
    expect(wrapper.find('.output-container').html()).to.contain('height: 1px');
    expect(wrapper.find('.toggle').hasClass('fa-chevron-right')).to.equal(true);

    wrapper.find('.toggle-container').simulate('click');
    expect(wrapper.state().collapse).to.equal(true);
    setTimeout(() => {
      expect(wrapper.find('.output-container').html()).to.not.contain('height: 1px');
      expect(wrapper.find('.toggle').hasClass('fa-chevron-down')).to.equal(true);
      done();
    }, 1024);
  });
});
