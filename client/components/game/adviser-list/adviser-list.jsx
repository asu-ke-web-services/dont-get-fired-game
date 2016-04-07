import React from 'react';

export default React.createClass({
  renderAdviserList() {
    let adviserList = 'No advisers';
    if (this.props.advisers) {
      adviserList = this.props.advisers.map((adviser, i) => {
        return (
          <li key={i} className="adviser-list__list-item">
            {adviser.name} - {adviser.dialog}
          </li>
        );
      });
    }

    return adviserList;
  },

  render() {
    return (
      <div className="adviser-list">
        <h2>Your Advisers</h2>
        <ul className="adviser-list__list">
          {this.renderAdviserList()}
        </ul>
      </div>
    );
  }
});
