var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    INITIALIZED: null,
    PARTICIPANTS_UPDATED: null,
    TOGGLE_SCORE_DISPLAY: null,
    VOTES_CHANGED: null,
    RESET_SCORES: null,
    SELECT_CARD: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
