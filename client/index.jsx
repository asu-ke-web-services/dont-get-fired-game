import React from 'react';
import ReactDOM from 'react-dom';
import {default as StartPage} from './components/home/startPage.jsx';

Meteor.startup(function () {
ReactDOM.render( <StartPage />, document.getElementById('render-target'));
});