import React from 'react';
import {SelectComponent} from './select';

const InfoComponent = React.createClass({
  render() {
    const {users, repository} = this.props;

    const className = 'col-md-12 ellipsis';
    const list = users.map((user, index) => {
      return (
        <SelectComponent {...this.props} key={`${user}-${index}`} user={user} />
      );
    });
    return (
      <div className="row">
        <div className={className}>
          <p>{repository}</p>
        </div>
        {list}
      </div>
    );
  }
});

export default {InfoComponent};
