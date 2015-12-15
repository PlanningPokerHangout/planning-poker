import React from 'react';
import { resetScores, toggleScoreDisplay } from '../actions';

var Moderator = React.createClass({
    _resetScores: function() {
        resetScores();
    },
    _toggleScores: function() {
        toggleScoreDisplay();
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
