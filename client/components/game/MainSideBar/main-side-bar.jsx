import { next-quarter-button } from '../../../components/game/sidebar/next-quarter-button/next-quarter-button';
import { advisor-panel } from '../../../components/game/advisor-panel/advisor-panel';
import {company-name} from '../../../components/game/company-name/company-name';

export default React.createClass({
  render() {
    return (
      <div className="main-side-bar">
        <div className="company-name">
          <company-name/>
        </div>
        <div className="advisor-panel">
          <advisor-panel/>
        </div>
        <div className="next-quarter-button">
          <next-quarter-button/>
        </div>
      </div>

    );
  }
});
