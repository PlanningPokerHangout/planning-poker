var PlanningPokerAppDispatcher = require('../dispatcher/PlanningPokerAppDispatcher.js');
var PlanningPokerConstants = require('../constants/PlanningPokerConstants.js');

var ActionTypes = PlanningPokerConstants.ActionTypes;
var PayloadSources = PlanningPokerConstants.PayloadSources;

module.exports = {
  resetScores: function() {
    PlanningPokerAppDispatcher.handleViewAction({
      type: ActionTypes.RESET_SCORES
    });
  },
  toggleScoreDisplay: function() {
    PlanningPokerAppDispatcher.handleViewAction({
      type: ActionTypes.TOGGLE_SCORE_DISPLAY
    });
  },
  selectCard: function(participantID, cardValue) {
    PlanningPokerAppDispatcher.handleViewAction({
      type: ActionTypes.SELECT_CARD,
      participantID: participantID,
      cardValue: cardValue
    });
  },
  updateParticipants: function(participants) {
    PlanningPokerAppDispatcher.handleServerAction({
      type: ActionTypes.PARTICIPANTS_UPDATED,
      participants: participants
    });
  },
  updateLocalParticipant: function(participant) {
    PlanningPokerAppDispatcher.handleServerAction({
      type: ActionTypes.LOCAL_PARTICIPANT_UPDATED,
      participant: participant
    });
  },
  updateVotes: function(votes) {
    PlanningPokerAppDispatcher.handleServerAction({
      type: ActionTypes.VOTES_CHANGED,
      votes: votes
    });
  },
  setInitialData: function(initialData) {
    PlanningPokerAppDispatcher.handleServerAction({
      type: ActionTypes.INITIALIZED,
      localParticipant: initialData.localParticipant,
      participants: initialData.participants,
      votes: initialData.votes
    });
  }

};
