var React = require('react');

var Poker = require('./components/Poker.react');
var GoogleHangoutDAO = require('./dao/GoogleHangoutDAO');

GoogleHangoutDAO.init();

React.render(
    <Poker />,
    document.getElementById('app')
);
