var React = require('react/addons');

var ParticipantStore = require('../stores/ParticipantStore');
var VoteStore = require('../stores/VoteStore');
var SettingsStore = require('../stores/SettingsStore');

var _ = require('underscore');

var CHECK_MARK = "\u2713";

var Participant = React.createClass({
    render: function() { 
        var displayName = this.props.participant.person.displayName;
        var vote = this.props.vote;
        var voteValue = vote.reveal ? vote.value : vote.default;

        var cx = React.addons.classSet;
        var participantClasses = cx({
            'participant': true,
            'inactive': !this.props.participant.hasAppEnabled,
        });
        var scoreClasses = cx({
            'score': true,
            'right': true,
            'hide': _.isNull(vote.value),
        });

        return (
            <li className={participantClasses}>
                <p className="name">
                    <span className={scoreClasses}>{voteValue}</span>
                    {displayName}
                </p>
            </li>
        );
    },
});

function _getStateFromStore() {
    return {
        participants: ParticipantStore.getParticipants(),
        displayScores: SettingsStore.shouldDisplayScores(),
    };
}

var Participants = React.createClass({
    getInitialState: function() {
        return _getStateFromStore();
    },
    componentDidMount: function() {
        ParticipantStore.addChangeListener(this._onChange);
        VoteStore.addChangeListener(this._onChange);
        SettingsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        ParticipantStore.removeChangeListener(this._onChange);
        VoteStore.removeChangeListener(this._onChange);
        SettingsStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(_getStateFromStore());
    },
    render: function() {
        var revealScores = this.state.displayScores;

        function _renderParticipant(participant) {
            var vote = {
                reveal: revealScores,
                value: VoteStore.getVoteByID(participant.id),
                default: CHECK_MARK,
            };

            return (
                <Participant 
                    participant={participant} 
                    vote={vote}
                    key={participant.id} 
                    />
            );
        }

        var activeParticipants = this.state.participants.active.map(_renderParticipant),
            inactiveParticipants = this.state.participants.inactive.map(_renderParticipant);

        return (
            <div className="participants">
                <h4>Participants</h4>
                <div className="row">
                    <div className="columns small-offset-1 small-10">
                        <ul className="small-block-grid-1 medium-block-grid-2 large-block-grid-3">
                            {activeParticipants}
                            {inactiveParticipants}
                        </ul>
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = Participants;
