var React = require('react/addons');

// Actions
var Actions = require('../actions/PlanningPokerActionCreators');

var VotingOption = React.createClass({
    handleClick: function() {
        Actions.selectCard(this.props.participantID, this.props.value);
    },
    render: function() {
        var cx = React.addons.classSet;
        var optionClasses = cx({
            'button': true,
            'selected': this.props.selected,
        });

        var classes = cx({
            "columns": true,
            "small-4": true,
            "medium-3": true,
            "end": this.props.lastItem,
        });

        return (
            <div className={classes}>
                <div onClick={this.handleClick} className={optionClasses} >
                    {this.props.value}
                </div>
            </div>
        );
    },
});

module.exports = VotingOption;
