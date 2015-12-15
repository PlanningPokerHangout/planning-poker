import PlanningPokerAppDispatcher from './dispatcher/PlanningPokerAppDispatcher.js';
import { ActionTypes } from './constants';

export function resetScores() {
    PlanningPokerAppDispatcher.handleViewAction({
        type: ActionTypes.RESET_SCORES,
    });
}

export function toggleScoreDisplay() {
    PlanningPokerAppDispatcher.handleViewAction({
        type: ActionTypes.TOGGLE_SCORE_DISPLAY,
    });
}

export function selectCard(participantID, cardValue) {
    PlanningPokerAppDispatcher.handleViewAction({
        type: ActionTypes.SELECT_CARD,
        participantID: participantID,
        cardValue: cardValue,
    });
}

export function updateParticipants(participants) {
    PlanningPokerAppDispatcher.handleServerAction({
        type: ActionTypes.PARTICIPANTS_UPDATED,
        participants: participants,
    });
}

export function updateLocalParticipant(participant) {
    PlanningPokerAppDispatcher.handleServerAction({
        type: ActionTypes.LOCAL_PARTICIPANT_UPDATED,
        participant: participant,
    });
}

export function updateVotes(votes) {
    PlanningPokerAppDispatcher.handleServerAction({
        type: ActionTypes.VOTES_CHANGED,
        votes: votes,
    });
}

export function setInitialData(initialData) {
    PlanningPokerAppDispatcher.handleServerAction({
        type: ActionTypes.INITIALIZED,
        localParticipant: initialData.localParticipant,
        participants: initialData.participants,
        votes: initialData.votes,
    });
}
