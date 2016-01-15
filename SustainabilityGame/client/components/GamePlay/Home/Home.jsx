/**
 * Game Home
 */
GamePlay = typeof GamePlay === 'undefined' ? {} : GamePlay;

GamePlay.Home = React.createClass({
  mixins: [ReactBEM],

  handlePlay(e) {
    e.preventDefault();

    SceneStore.transition(<GameSetup.View />);
  },

  bem_blocks: ['home'],
  bem_block_modifiers: ['gameplay'],
  bem_render() {
    return (
      <div bem_element="">
        <h1>Game Name Here</h1>
        <button onClick={this.handlePlay}>Play</button>
      </div>
    );
  }
});
