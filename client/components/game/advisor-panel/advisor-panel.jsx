import React from 'react';

export default React.createClass({
  renderAdvisorList() {
    if (this.props.advisors) {
      return this.props.advisors.map(function (advisor) {
        return <li className="advisor-panel__list-item">{advisor.name} - {advisor.dialog}</li>;
      });
    } else {
      return 'No advisors';
    }
  },

  render() {
    return (
      <div className="advisor-panel">
        <h2>Your Advisors</h2>
        <ul className="advisor-panel__list">
          {this.renderAdvisorList()}
        </ul>
      </div>
    );
  }
});
