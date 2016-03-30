import React from 'react';

import { default as ProgramList } from '../program-list/program-list.jsx';
import { default as Program } from '../program/program.jsx';
export default React.createClass({
  renderProgramGroup() {

    if (this.props.programs === undefined || this.props.programs === null ) {
      return (
       <h4>No Programs Exist</h4>
      );
    }
    if (this.props.selectedProgram !== undefined && this.props.selectedProgram !== null) {
      return (
        <Program capital={this.props.capital}
                 actions={this.props.actions} program={this.props.selectedProgram} />
      );
    }
    if (this.props.selectedProgram === undefined || this.props.selectedProgram === null) {
      return (
        <ProgramList programs={this.props.programs}/>
      );
    }
  },
  render() {
    return (
      <div className="main-action-area-window">
        <h1>Programs</h1>
        {this.renderProgramGroup()}
      </div>
     );
  }
});
