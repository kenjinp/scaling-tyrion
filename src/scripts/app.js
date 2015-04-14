global.jQuery = global.$ = require('jquery');
var React = require('react');

var Content = React.createClass({
  getInitialState: function() {
    return {data: 'hello world'};
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <div>
        { this.state.data }
      </div>
    );
  }
});

React.render(
  <Content />,
   document.getElementById('content')
);
