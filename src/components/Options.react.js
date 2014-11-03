/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('underscore');

var Actions = require('../actions/PlanningPokerActionCreators');
var PlanningPokerStore = require('../stores/PlanningPokerStore');

var Option = React.createClass({
  handleClick: function(event) {
    Actions.selectCard(this.props.participantID, this.props.value);
  },
  render: function() {
    var cx = React.addons.classSet;
    var optionClasses = cx({
        'button': true,
        'selected': this.props.selected
    });

    var classes = cx({
      "columns": true,
      "small-4": true,
      "medium-3": true,
      "end": this.props.lastItem
    });


    return (
      <div className={classes}>
        <div onClick={this.handleClick} className={optionClasses} >
          {this.props.value}
        </div>
      </div>
    );
  }
});

function _getStateFromStore() {
  return {
    me: PlanningPokerStore.getLocalParticipant(),
    choices: ["?", "0", "1/2", "1", "2", "3", "5", "8", "13"]
  };
}

var Options = React.createClass({
  getInitialState: function () {
    return _getStateFromStore();
  },
  componentDidMount: function() {
    PlanningPokerStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PlanningPokerStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(_getStateFromStore());
  },
  render: function() {
    var me = this.state.me;
    var options = _.map(this.state.choices, function(choice, idx, list) {
      var selected = choice === me.vote;
      var lastItem = idx === list.length - 1;

      return (
        <Option 
          value={choice} 
          participantID={me.id} 
          selected={selected} 
          lastItem={lastItem}
          key={idx}
          />
      );
    });

    return (
      <div className="options">
        <h4>Select a Value</h4>
        <div className="row">
          {options}
        </div>
      </div>
    );
  }
});

module.exports = Options;
