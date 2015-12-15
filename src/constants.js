import keyMirror from 'keymirror';

export const ActionTypes = keyMirror({
    INITIALIZED: null,
    PARTICIPANTS_UPDATED: null,
    TOGGLE_SCORE_DISPLAY: null,
    VOTES_CHANGED: null,
    RESET_SCORES: null,
    SELECT_CARD: null,
});
