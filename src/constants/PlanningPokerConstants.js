var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RESET_SCORES: null,
    TOGGLE_SCORE_DISPLAY: null,
    SELECT_CARD: null,
    PARTICIPANTS_UPDATED: null,
    HANGOUT_STATE_UPDATED: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
