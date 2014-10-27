/** @jsx React.DOM */

var React = require('react/addons');
var gapi = window.gapi;

var Option = React.createClass({
  handleClick: function(event) {
    gapi.hangout.data.setValue(this.props.participantID, this.props.value);
  },
  render: function() {
    var cx = React.addons.classSet;
    var optionClasses = cx({
        'option': true,
        'selected': this.props.selected
    });
    return (
      <li onClick={this.handleClick} className={optionClasses} >
        {this.props.value}
      </li>
    );
  }
});

module.exports = Option;

