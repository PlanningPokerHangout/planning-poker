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
  updateHangoutState: function(state) {
    PlanningPokerAppDispatcher.handleServerAction({
      type: ActionTypes.HANGOUT_STATE_UPDATED,
      state: state
    });
  }
};
