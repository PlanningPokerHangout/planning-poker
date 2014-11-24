var gapi = window.gapi;

var PlanningPokerAppDispatcher = require('../dispatcher/PlanningPokerAppDispatcher');
var PlanningPokerConstants = require('../constants/PlanningPokerConstants');
var Actions = require('../actions/PlanningPokerActionCreators');
var ActionTypes = PlanningPokerConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var ParticipantStore = require('../stores/ParticipantStore');

var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

/* Utility Functions */
function getParticipantIDS() {
  var participants = ParticipantStore.getParticipants().all;
  var participantIDS = _.pluck(participants, 'id');

  return participantIDS;
}
function getVotesFromState(state) {
  var participantIDS = getParticipantIDS();
  var votes = _.pick(state, participantIDS);

  return votes;
}
/* End Utility Functions */

/* Hangout Event Callbacks */
function peopleChanged(eventObj) {
  Actions.updateParticipants(eventObj.participants);
}

function hangoutStateChanged(eventObj) {
  var state = eventObj.state;
  var votes = getVotesFromState(state);
  Actions.updateVotes(votes);
}

function initializeHangout() {
  var localParticipantId = gapi.hangout.getLocalParticipantId();
  var localParticipant = gapi.hangout.getParticipantById(localParticipantId);

  var participants = gapi.hangout.getParticipants();

  var state = gapi.hangout.data.getState();
  var votes = getVotesFromState(state);

  setTimeout(function() {
    Actions.setInitialData({
      localParticipant: localParticipant, 
      participants: participants, 
      votes: votes,
    });
  }, 5);
}

function registerHangoutCallbacks() {
  gapi.hangout.onApiReady.add(initializeHangout);
  gapi.hangout.onParticipantsChanged.add(peopleChanged);
  gapi.hangout.data.onStateChanged.add(hangoutStateChanged);
}
/* End Hangout Event Callbacks */

/* Update Google Hangout Data */

// Results in a data.onStateChanged event for all users
function selectCard(value) {
  var me = ParticipantStore.getLocalParticipant();
  gapi.hangout.data.setValue(me.id, value);
}

// Results in a onParticipantsChanged event for all users
function resetScores() {
  gapi.hangout.data.submitDelta(
    [], // to add
    getParticipantIDS() // to remove
  );
}

/* End Update Google Hangout Data */


var GoogleHangoutDAO = {
  init: function() {
    registerHangoutCallbacks();
  }
};


GoogleHangoutDAO.dispatchToken = PlanningPokerAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RESET_SCORES:
      resetScores();
      break;
    case ActionTypes.SELECT_CARD:
      selectCard(action.cardValue);
      break;
    default:
      // do nothing
    }
});


module.exports = GoogleHangoutDAO;
