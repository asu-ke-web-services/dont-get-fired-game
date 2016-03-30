import React from 'react';

export default React.createClass({
  renderAdvisorList() {
    let advisorList = 'No advisors';
    if (this.props.state.game.advisors) {
      advisorList = this.props.state.game.advisors.map((advisor, i) => {
        let advice = advisor.advice(this.props.state.game);
        return (
          <li key={i} className="advisor-panel__list-item">
          <p><img width="100" src={"icons/adviser"+(i+1)+".jpg"}/>
          {advisor.name}</p>
          <div>
            {advice.statement} - {advice.feeling}
            </div>
          </li>
        );
      });
    }

    return advisorList;
  },

  render() {
    return (
      <div className="advisor-panel">
        <br/>
        <ul className="advisor-panel__list">
          {this.renderAdvisorList()}
        </ul>
      </div>
    );
  }
});
