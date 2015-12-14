var React = require('react/addons');
var _ = require('underscore');

// Stores
var ParticipantStore = require('../stores/ParticipantStore');
var VoteStore = require('../stores/VoteStore');

// Components
var VotingOption = require('./VotingOption.react');

function _getStateFromStore() {
    return {
        me: ParticipantStore.getLocalParticipant(),
        choices: ["?", "0", "1/2", "1", "2", "3", "5", "8", "13"],
    };
}

var Ballot = React.createClass({
    getInitialState: function () {
        return _getStateFromStore();
    },
    componentDidMount: function() {
        ParticipantStore.addChangeListener(this._onChange);
        VoteStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        ParticipantStore.removeChangeListener(this._onChange);
        VoteStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(_getStateFromStore());
    },
    renderVotingOption: function(choice, idx, list) {
        var vote = VoteStore.getVoteByID(this.state.me.id);
        var selected = choice === vote;
        var lastItem = idx === list.length - 1;

        return (
            <VotingOption 
                value={choice} 
                participantID={this.state.me.id} 
                selected={selected} 
                lastItem={lastItem}
                key={idx}
                />
        );
    },
    render: function() {
        var votingOptionList = _.map(this.state.choices, this.renderVotingOption);

        return (
            <div className="options">
                <h4>Select a Value</h4>
                <div className="row">
                    {votingOptionList}
                </div>
            </div>
        );
    },
});

module.exports = Ballot;
