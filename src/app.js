/** @jsx React.DOM */

var React = require('react');
var gapi = window.gapi;

var Poker = require('./components/Poker.react');

var GoogleHangoutDAO = require('./dao/GoogleHangoutDAO');

gapi.hangout.onApiReady.add(function() {
  GoogleHangoutDAO.init();
  React.render(
    <Poker />,
    document.getElementById('app')
  );
});
