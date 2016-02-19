import React from 'react';

import {default as ProgramList} from '../program-list/program-list.jsx';

export default React.createClass({
  render() {
    return (
      <ProgramList programs={this.props.programs} />
    );
  }
});
