import assign from 'object-assign';
import { Dispatcher } from 'flux';

var PlanningPokerAppDispatcher = assign(new Dispatcher(), {
    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the server.
     */
    handleAction: function(action) {
        var payload = {
            action: action,
        };
        this.dispatch(payload);
    },

});

module.exports = PlanningPokerAppDispatcher;
