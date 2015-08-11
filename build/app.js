/** @jsx React.DOM */

var React = require('react');

var Poker = require('./components/Poker.react');

React.renderComponent(
  Poker(null),
  document.getElementById('app')
);
