import {Component} from 'react';
import CommandContainer from '../../containers/command';

class CommandListComponent extends Component {
  render() {
    return (
      <div className="col-md-12 col-xs-12 col-sm-12 detail-container">
        {this.props.commands.map(
          cmd => (<CommandContainer key={cmd._id} {...cmd} />)
        )}
      </div>
    );
  }
}

export default {CommandListComponent};
