import {Component} from 'react';

class CommandListComponent extends Component {
  render() {
    return (
      <div className="col-md-12 col-xs-12 col-sm-12 detail-container">
        {this.props.commands.map(
          cmd => (<CommandComponent key={cmd._id} {...cmd} />)
        )}
      </div>
    );
  }
}

export default {CommandListComponent};
