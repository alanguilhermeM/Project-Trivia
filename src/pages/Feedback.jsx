import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    // console.log(assertions);
    const assert = 3;
    return (
      <div>
        <h1>Feedback</h1>
        {assertions < assert
          ? <span data-testid="feedback-text">Could be better...</span>
          : <span data-testid="feedback-text">Well Done!</span>}

        <div>
          <div>
            <h3>Placar Final</h3>
            <p data-testid="feedback-total-score">{score}</p>
          </div>
        </div>
        <div>
          <h3>Acertos</h3>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
