var PlanningPokerAppDispatcher = require('../dispatcher/PlanningPokerAppDispatcher.js');
var PlanningPokerConstants = require('../constants/PlanningPokerConstants.js');
var ActionTypes = PlanningPokerConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var shouldDisplayScores = false;
var appIsInitialized = false;

function toggleScoreDisplay() {
  shouldDisplayScores = !shouldDisplayScores;
}

var SettingsStore = _.extend({
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  shouldDisplayScores: function() {
    return shouldDisplayScores;
  },
  appIsInitialized: function() {
    return appIsInitialized;
  },

}, EventEmitter.prototype);

SettingsStore.dispatchToken = PlanningPokerAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.TOGGLE_SCORE_DISPLAY:
      toggleScoreDisplay();
      SettingsStore.emitChange();
      break;
    case ActionTypes.INITIALIZED:
      appIsInitialized = true;
      SettingsStore.emitChange();
      break;
    default:
      // do nothing
    }
});

module.exports = SettingsStore;
