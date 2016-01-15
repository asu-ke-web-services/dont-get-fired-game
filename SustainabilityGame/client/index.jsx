Meteor.startup(function () {
  Flint(function () {
    ReactDOM.render( <GamePlay.Game />, document.getElementById("render-target"));
  }, 'GamePlay.Home', 'GamePlay.Game', 'GameSetup.View');
});
