var React = require('react/addons');

// Components
var Ballot = require('./Ballot.react');
var Participants = require('./Participants.react');
var Moderator = require('./Moderator.react');

// Stores
var SettingsStore = require('../stores/SettingsStore');

function _getStateFromStore() {
    return {
        initialized: SettingsStore.appIsInitialized(),
    };
}

var Poker = React.createClass({
    getInitialState: function() {
        return _getStateFromStore();
    },
    componentDidMount: function() {
        SettingsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        SettingsStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(_getStateFromStore());
    },
    render: function() {
        if (!this.state.initialized) {
            
            return (
                <div className="row">
                    <div className="columns small-12 text-center">
                        Initializing......
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Participants />
                <Ballot />
                <Moderator />
            </div>
        );
    },
});

module.exports = Poker;
