var gapi = window.gapi;

var PlanningPokerAppDispatcher = require('../dispatcher/PlanningPokerAppDispatcher.js');
var PlanningPokerConstants = require('../constants/PlanningPokerConstants.js');
var ActionTypes = PlanningPokerConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var localParticipantId;
var localParticipant;
var participants;
var hangoutState;
var displayScores = false;

function _initializePlanningPokerStore() {
  localParticipantId = gapi.hangout.getLocalParticipantId();
  localParticipant = gapi.hangout.getParticipantById(localParticipantId);

  _updateHangoutState(gapi.hangout.data.getState());
  _updateParticipants(gapi.hangout.getParticipants());
}

function _hasAppEnabled(participant) {
  return participant.hasAppEnabled === true;
}

function _updateParticipants(input) {
  if (input) {
    participants = input;
  }

  function applyVote(participant) {
    var pID = participant.id;
    _.extend(participant, {
      vote: hangoutState[pID]
    });
    return participant;
  }
  participants = _.map(participants, applyVote);

  applyVote(localParticipant);
}

function _updateHangoutState(state) {
  hangoutState = state;
}

function _toggleScoreDisplay() {
  displayScores = !displayScores;
}

var PlanningPokerStore = _.extend(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getParticipants: function() {
    return {
      active: _.filter(participants, _hasAppEnabled),
      inactive: _.reject(participants, _hasAppEnabled)
    };
  },
  displayScores: function() {
    return displayScores;
  },
  getLocalParticipant: function() {
    return localParticipant;
  },
  getParticipantIds: function() {
    var WHITE_LIST = [];
    return _.keys(_.omit(hangoutState, WHITE_LIST));
  },
});

PlanningPokerStore.dispatchToken = PlanningPokerAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.PARTICIPANTS_UPDATED:
      _updateParticipants(action.participants);
      PlanningPokerStore.emitChange();
      break;
    case ActionTypes.HANGOUT_STATE_UPDATED:
      _updateHangoutState(action.state);
      _updateParticipants();
      PlanningPokerStore.emitChange();
      break;
    case ActionTypes.TOGGLE_SCORE_DISPLAY:
      _toggleScoreDisplay();
      PlanningPokerStore.emitChange();
      break;
    default:
      // do nothing
    }
});

_initializePlanningPokerStore();

module.exports = PlanningPokerStore;
