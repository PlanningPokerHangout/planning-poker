/** @jsx React.DOM */

var gapi = window.gapi;

var React = require('react');
var _ = require('underscore');

var Option = require('./Option.react');
var Participant = require('./Participant.react');

var Poker = React.createClass({
  getInitialState: function () {
    var id = gapi.hangout.getLocalParticipantId();
    var person = gapi.hangout.getParticipantById(id).person;

    return {
      participants: gapi.hangout.getParticipants(),
      hangoutState: gapi.hangout.data.getState(),
      myID: {
        local: id,
        global: person.id
      }
    };
  },
  componentDidMount: function() {
    gapi.hangout.onParticipantsChanged.add(this._peopleChanged);
    gapi.hangout.data.onStateChanged.add(this._hangoutStateChanged);
  },
  componentWillUnmount: function() {
    gapi.hangout.onParticipantsChanged.remove(this._peopleChanged);
    gapi.hangout.data.onStateChanged.remove(this._hangoutStateChanged);
  },
  _peopleChanged: function(eventObj) {
    this.setState({
      participants: eventObj.participants
    });
  },
  _hangoutStateChanged: function(eventObj) {
    console.log("PP: State has changed. ");
    console.dir(eventObj.state);
    this.setState({
      hangoutState: eventObj.state
    });
  },
  _showScores: function() {
    function get_ids(participant) {
      return participant.person.id;
    }
    var state = this.state.hangoutState;
    function has_made_decision(id) {
      return state[id] !== undefined;
    }
    return _.map(this.state.participants, get_ids).every(has_made_decision);
  },
  render: function() {
    var id = this.state.myID;
    var state = this.state.hangoutState;
    var show_scores = this._showScores();
    var participants = this.state.participants.map(function(participant) {
      var score = show_scores ? state[participant.person.id] : false;
      return (
        <Participant participant={participant.person} key={participant.person.id} score={score} />
      );
    });
    var choices = ["?", "0", "1/2", "1", "2", "3", "5", "8", "13"].map(function(option) {
      var selected = option === state[id.global];
      return (
        <Option value={option} participantID={id.global} selected={selected} />
      );
    });
    return (
      <div>
        <h4>Participants!</h4>
        <ul className="participants">
          {participants}
        </ul>
        <h4>Select a Value</h4>
        <ul className="options">
          {choices}
        </ul>
      </div>
    );
  }
});

module.exports = Poker;
