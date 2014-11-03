/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('underscore');

var utils = require('../utils');

var Options = require('./Options.react');
var Participants = require('./Participants.react');
var Moderator = require('./Moderator.react');

var Actions = require('../actions/PlanningPokerActionCreators');
var PlanningPokerStore = require('../stores/PlanningPokerStore');

function _getStateFromStore() {
  return {
    displayScores: PlanningPokerStore.displayScores(),
    participants: PlanningPokerStore.getParticipants(),
    me: PlanningPokerStore.getLocalParticipant()
  };
}

var Poker = React.createClass({
  getInitialState: function () {
    return _getStateFromStore();
  },
  componentDidMount: function() {
    PlanningPokerStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PlanningPokerStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(_getStateFromStore());
  },
  render: function() {
    var id = this.state.myID;
    var state = this.state.hangoutState;
    var showScores = this.state.showScores;

    return (
      <div>
        <Participants />
        <Options />
        <Moderator />
      </div>
    );
  }
});

module.exports = Poker;
