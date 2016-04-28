import React from 'react';

export default React.createClass({
  renderAdviserList() {
    let adviserList = 'No advisers';
    if (this.props.state.game.advisers) {
      adviserList = this.props.state.game.advisers.map((adviser, i) => {
        let advice = adviser.advice(this.props.state.game);
        return (
          <li key={i} className="adviser-panel__list-item">
          <p><img width="100" src={'icons/adviser' + (i + 1) + '.jpg'}/>
          {adviser.name}</p>
          <div>
            {advice.statement} - {advice.feeling}
            </div>
          </li>
        );
      });
    }

    return adviserList;
  },

  render() {
    return (
      <div className="adviser-panel">
        <br/>
        <ul className="adviser-panel__list">
          {this.renderAdviserList()}
        </ul>
      </div>
    );
  }
});
