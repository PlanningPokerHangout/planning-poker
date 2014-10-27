/** @jsx React.DOM */

var React = require('react/addons');

var Participant = React.createClass({
  render: function() { 
    var value;
    if (!this.props.participant) {
      value = "A participant not running this app.";
    } else {
      value = this.props.participant.displayName;
    }

    var validScore = true;
    if (this.props.score === undefined || this.props.score === false) {
      validScore = false;
    }

    var cx = React.addons.classSet;
    var scoreClasses = cx({
        'score': true,
        'score-hidden': !validScore
    });
    return (
      <li className="participant">
        <div className="name">{value}</div>
        <div className={scoreClasses}>{this.props.score}</div>
      </li>
    );
  }
});

module.exports = Participant
