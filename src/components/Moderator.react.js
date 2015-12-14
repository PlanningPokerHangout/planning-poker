var React = require('react');

var Actions = require('../actions/PlanningPokerActionCreators');

var Moderator = React.createClass({
    _resetScores: function() {
        Actions.resetScores();
    },
    _toggleScores: function() {
        Actions.toggleScoreDisplay();
    },
    render: function() {
        return (
            <div className="row">
                <div className="small-offset-2 small-4 columns">
                    <div className="button" onClick={this._resetScores}>Reset Voting</div>
                </div>
                <div className="small-4 end columns">
                    <div className="button" onClick={this._toggleScores}>Toggle Scores</div>
                </div>
            </div>
        );
    },
});

module.exports = Moderator;
