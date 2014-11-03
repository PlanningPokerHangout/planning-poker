/** @jsx React.DOM */

var React = require('react/addons');
var PlanningPokerStore = require('../stores/PlanningPokerStore');

var CHECK_MARK = "\u2713";

var Score = React.createClass({
  render: function() {
    var value = this.props.usePlaceholder ? CHECK_MARK : this.props.value;

    var element; 
    switch(this.props.value) {
      case undefined:
        element = null;
        break;
      default:
        element = (
          <div className="score">{value}</div>
        );
        break;
    }

    return element;
  }
});

var Participant = React.createClass({
  render: function() { 
    var value;
    if (!this.props.participant) {
      value = "A participant not running this app.";
    } else {
      value = this.props.participant.person.displayName;
    }

    return (
      <div className="columns small-12 medium-6 large-4">
        <div className="participant">
          <div className="name">{value}</div>
          <Score 
            value={this.props.participant.vote} 
            usePlaceholder={!this.props.displayScore} 
            />
        </div>
      </div>
    );
  }
});

function _getStateFromStore() {
  return {
    participants: PlanningPokerStore.getParticipants(),
    displayScores: PlanningPokerStore.displayScores(),
  };
}

var Participants = React.createClass({
  getInitialState: function() {
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
    var displayScore = this.state.displayScores;
    function _renderParticipant(participant) {
      return (
        <Participant 
          participant={participant} 
          key={participant.id} 
          displayScore={displayScore}
          />
      );
    }

    var activeParticipants = this.state.participants.active.map(_renderParticipant),
        inactiveParticipants = this.state.participants.inactive.map(_renderParticipant);

    return (
      <div className="participants">
        <h4>Active Participants</h4>
        <div className="row">
          {activeParticipants}
        </div>
        <h4>Inactive Participants</h4>
        <div className="row">
          {inactiveParticipants}
        </div>
      </div>
    );
  }
});

module.exports = Participants
