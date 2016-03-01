import React from 'react';
import {SceneActions} from './next-scene/next-scene.jsx';
import Event from '../event-page/event-page.jsx';

export default React.createClass({
  nextQuater(e) {
    e.preventDefault();

    SceneActions.transition(<Event />);
  },

  render() {
    return (
        <div className="quaterReport">
          <h1 className="quaterReport_headline">End Of Quater {this.props.quater.quaterNumber}</h1>
          <span className="quaterReport_information">
            {this.props.quater.quaterResult}
            <br/>
            {this.props.quater.quaterState}
            <br/>
            {this.props.quater.nextQuaterState}
            <button onClick={this.nextQuater}>Start Your Next Quater</button>
          </span>
        </div>
    );
  }
});

