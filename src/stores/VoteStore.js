import EventEmitter from 'events';
import PlanningPokerAppDispatcher from '../dispatcher/PlanningPokerAppDispatcher.js';
import _ from 'underscore';
import { ActionTypes } from '../constants';

var CHANGE_EVENT = 'change';
var votes = {};

var VoteStore = _.extend({
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    getVoteByID: function(id) {
        return votes[id] || null;
    },
}, EventEmitter.prototype);

function updateVotes(updatedVotes) {
    votes = updatedVotes;
}

VoteStore.dispatchToken = PlanningPokerAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.type) {
    case ActionTypes.INITIALIZED:
        updateVotes(action.votes);
        VoteStore.emitChange();
        break;
    case ActionTypes.VOTES_CHANGED:
        updateVotes(action.votes);
        VoteStore.emitChange();
        break;
    default:
        // do nothing
    }
});

module.exports = VoteStore;
