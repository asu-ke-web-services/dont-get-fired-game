import React from 'react';

import { default as ProgramListItem } from '../program-list-item/program-list-item.jsx';

export default React.createClass({
  render() {
    return (
      <div className="program-list">
        {this.props.programs.map((program, i) => {
          return <ProgramListItem program={program} key={i} />
        })}
      </div>
    );
  }
});
