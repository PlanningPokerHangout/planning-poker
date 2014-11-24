var PlanningPokerAppDispatcher = require('../dispatcher/PlanningPokerAppDispatcher.js');
var PlanningPokerConstants = require('../constants/PlanningPokerConstants.js');
var ActionTypes = PlanningPokerConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var localParticipant = null;
var participants = [];

function hasAppEnabled(participant) {
  return participant.hasAppEnabled === true;
}

function updateLocalParticipant(participant) {
  localParticipant = participant;
}

function updateParticipants(input) {
  participants = input;
}

var ParticipantStore = _.extend({
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
      all: participants,
      active: _.filter(participants, hasAppEnabled),
      inactive: _.reject(participants, hasAppEnabled),
      local: localParticipant
    };
  },
  getLocalParticipant: function() {
    return localParticipant;
  },

}, EventEmitter.prototype);

ParticipantStore.dispatchToken = PlanningPokerAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.INITIALIZED:
      updateLocalParticipant(action.localParticipant);
      updateParticipants(action.participants);
      break;
    case ActionTypes.PARTICIPANTS_UPDATED:
      updateParticipants(action.participants);
      ParticipantStore.emitChange();
      break;
    default:
      // do nothing
    }
});

module.exports = ParticipantStore;
