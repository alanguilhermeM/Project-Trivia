import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    console.log(assertions);
    const assert = 3;
    return (
      <div>
        <h1>Feedback</h1>
        {assertions < assert
          ? <span data-testid="feedback-text">Could be better...</span>
          : <span data-testid="feedback-text">Well Done!</span>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
