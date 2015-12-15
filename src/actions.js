import AppDispatcher from './dispatcher/PlanningPokerAppDispatcher.js';
import { ActionTypes } from './constants';

export function resetScores() {
    AppDispatcher.handleAction({
        type: ActionTypes.RESET_SCORES,
    });
}

export function toggleScoreDisplay() {
    AppDispatcher.handleAction({
        type: ActionTypes.TOGGLE_SCORE_DISPLAY,
    });
}

export function selectCard(participantID, cardValue) {
    AppDispatcher.handleAction({
        type: ActionTypes.SELECT_CARD,
        participantID: participantID,
        cardValue: cardValue,
    });
}

export function updateParticipants(participants) {
    AppDispatcher.handleAction({
        type: ActionTypes.PARTICIPANTS_UPDATED,
        participants: participants,
    });
}

export function updateLocalParticipant(participant) {
    AppDispatcher.handleAction({
        type: ActionTypes.LOCAL_PARTICIPANT_UPDATED,
        participant: participant,
    });
}

export function updateVotes(votes) {
    AppDispatcher.handleAction({
        type: ActionTypes.VOTES_CHANGED,
        votes: votes,
    });
}

export function setInitialData(initialData) {
    AppDispatcher.handleAction({
        type: ActionTypes.INITIALIZED,
        localParticipant: initialData.localParticipant,
        participants: initialData.participants,
        votes: initialData.votes,
    });
}
