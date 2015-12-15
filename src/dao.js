var gapi = window.gapi;

import { updateParticipants, updateVotes, setInitialData } from './actions';
import ParticipantStore from './stores/ParticipantStore';
import AppDispatcher from './dispatcher/PlanningPokerAppDispatcher';
import _ from 'underscore';
import { ActionTypes } from './constants';


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
    updateParticipants(eventObj.participants);
}

function hangoutStateChanged(eventObj) {
    var state = eventObj.state;
    var votes = getVotesFromState(state);
    updateVotes(votes);
}

function initializeHangout() {
    var localParticipantId = gapi.hangout.getLocalParticipantId();
    var localParticipant = gapi.hangout.getParticipantById(localParticipantId);

    var participants = gapi.hangout.getParticipants();

    var state = gapi.hangout.data.getState();
    var votes = getVotesFromState(state);

    setTimeout(function() {
        setInitialData({
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
    },
};


GoogleHangoutDAO.dispatchToken = AppDispatcher.register(function(payload) {
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