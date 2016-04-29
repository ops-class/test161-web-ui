import {Component} from 'react';
import CommandContainer from '../../containers/command';

class CommandListComponent extends Component {
  render() {
    const { commands, status = [] } = this.props;

    let statusContent = null;
    if (status.length > 0) {
      const statusArray = status.map(x => ({
        line: x.status + (x.message ? ': ' + x.message : '')
      }));
      const statusCommand = {
        input: { line: 'status' },
        output: statusArray,
        status: 'none',
      };
      statusContent = (<CommandContainer {...statusCommand} />);
    }

    return (
      <div className="col-md-12 col-xs-12 col-sm-12 detail-container">
        {statusContent}
        {commands.map(
          cmd => (<CommandContainer key={cmd._id} {...cmd} />)
        )}
      </div>
    );
  }
}

export {CommandListComponent};
