/** @jsx React.DOM */

var React = require('react');
var gapi = window.gapi;

var Poker = require('./components/Poker.react');

gapi.hangout.onApiReady.add(function() {
  React.render(
    <Poker />,
    document.getElementById('app')
  );
});
