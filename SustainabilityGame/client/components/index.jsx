Meteor.startup(function () {
  Flint(function () {
    ReactDOM.render( <GameSetup.View />, document.getElementById("render-target"));
  }, 'GameSetup.View');
});
