import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleLoginClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="submit"
          data-testid="btn-go-home"
          onClick={ this.handleLoginClick }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Ranking;
