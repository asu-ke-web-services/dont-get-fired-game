import React from 'react';

export default React.createClass({
  onClick() {
    // TODO
  },

  render() {
    return (
      <div className="program">
        <div className="program__wrapper">
          <img className="program__image" src={this.props.program.image} />
          <span className="program__information">
             {this.props.program.name}
             <br/>
             {this.props.program.shortDescription}
             <br/>
             {this.props.program.cost}
             <br/>
             {this.props.program.additional}
          </span>
          <button onClick={this.onClick}>
            Setup Program ({this.props.program.actionPointValue} Action Points)
          </button>
        </div>
      </div>
    );
  }
});
