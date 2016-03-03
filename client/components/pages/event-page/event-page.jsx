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
        <div className="event-page">
          <h1 className="event-page__headline">
            {this.props.event.name}
          </h1>
          <span className="event-page__information">
            {this.props.event.explain}
            <br/>
            {this.props.event.options}
            <button className="event-page__button" onClick={this.onClick(1)}>option 1</button>
            <button className="event-page__button" onClick={this.onClick(2)}>option 2</button>
          </span>
        </div>
    );
  }
});

