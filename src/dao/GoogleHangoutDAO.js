var gapi = window.gapi;

var PlanningPokerAppDispatcher = require('../dispatcher/PlanningPokerAppDispatcher');
var PlanningPokerConstants = require('../constants/PlanningPokerConstants');
var Actions = require('../actions/PlanningPokerActionCreators');
var ActionTypes = PlanningPokerConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var PlanningPokerStore = require('../stores/PlanningPokerStore');

var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');


function _peopleChanged(eventObj) {
  Actions.updateParticipants(eventObj.participants);
}

function _hangoutStateChanged(eventObj) {
  Actions.updateHangoutState(eventObj.state);
}

function _registerHangoutCallbacks() {
  gapi.hangout.onParticipantsChanged.add(_peopleChanged);
  gapi.hangout.data.onStateChanged.add(_hangoutStateChanged);
}

function _selectCard(value) {
  var me = PlanningPokerStore.getLocalParticipant();
  gapi.hangout.data.setValue(me.id, value);
}

function _resetScores() {
  gapi.hangout.data.submitDelta([], PlanningPokerStore.getParticipantIds());
}

var GoogleHangoutDAO = _.extend(EventEmitter.prototype, {
  init: function() {
    _registerHangoutCallbacks();
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

GoogleHangoutDAO.dispatchToken = PlanningPokerAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RESET_SCORES:
      _resetScores();
      GoogleHangoutDAO.emitChange();
      break;
    case ActionTypes.SELECT_CARD:
      _selectCard(action.cardValue);
      GoogleHangoutDAO.emitChange();
      break;
    default:
      // do nothing
    }
});

module.exports = GoogleHangoutDAO;
