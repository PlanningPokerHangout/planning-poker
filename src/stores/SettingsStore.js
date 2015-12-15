import AppDispatcher from '../dispatcher/PlanningPokerAppDispatcher';
import _ from 'underscore';
import { ActionTypes } from '../constants';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';
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

SettingsStore.dispatchToken = AppDispatcher.register(function(payload) {
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
    case ActionTypes.VOTES_CHANGED:
        if(Object.keys(action.votes).length == 0) {
            shouldDisplayScores = false;
        }
        break;
    default:
        // do nothing
    }
});

module.exports = SettingsStore;
