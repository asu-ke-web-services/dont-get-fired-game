import React from 'react';

import { default as ProgramList } from '../program-list/program-list.jsx';
import { default as Program } from '../program/program.jsx';
export default React.createClass({
  render() {
    return (
      <div className="main-action-area-window">
        <h4>Things To Do</h4>

        if(this.props.selectedProgram == null){
          <ProgramList programs={this.props.programs}/>
        }
        else {
          <Program program={this.props.selectedProgram} />
        }

        </div>
     );
  }
});
