import React from 'react';

export default React.createClass({
  onClick( /* option  */ ) {
    return (e) => {
      e.preventDefault();
      // TODO
    };
  },
  render() {
    return (
        <div>
          <h1 className="main-page"> Welcome to {this.props.main.name}</h1>
          <span className="main-page__information">
            {this.props.main.introduction}
            <br/>
            {this.props.main.currentCompanyState}
            <br/>
            {this.props.main.endGameGoal}
            <br/>
          </span>
            <button className="main-page__button" onClick={this.onClick(1)}>Back</button>
            <button className="main-page__button" onClick={this.onClick(2)}>Start Quater</button>
        </div>
    );
  }
});
