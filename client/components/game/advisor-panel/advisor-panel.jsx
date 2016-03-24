import React from 'react';

export default React.createClass({
  renderAdvisorList() {
    let advisorList = 'No advisors';
    if (this.props.state.game.advisors) {
      advisorList = this.props.state.game.advisors.map((advisor, i) => {
        let advice = advisor.advice(this.props.state.game);
        return (
          <li key={i} className="advisor-panel__list-item">

          {advisor.name} - {advice.statement} - {advice.feeling}
          <br/>
          <br/>
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
        <br/>
        <ul className="advisor-panel__list">
          {this.renderAdvisorList()}
        </ul>
      </div>
    );
  }
});
