import React from 'react';

export default React.createClass({
  renderAdvisorList() {
    let advisorList = 'No advisors';
    if (this.props.advisors) {
      advisorList = this.props.advisors.map((advisor, i) => {
        return (
          <li key={i} className="advisor-panel__list-item">
            {advisor.name} - {advisor.dialog}
          </li>
        );
      });
    }

    return advisorList;
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
