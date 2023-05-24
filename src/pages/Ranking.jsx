import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ResetScore } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking) {
      this.setState({
        ranking,
      });
    }
  }

  onGoHomeButtonClick = async (evt) => {
    const { history, dispatch } = this.props;
    evt.preventDefault();
    dispatch(ResetScore());
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    const listaRanking = ranking.sort((a, b) => b.score - a.score).map((entry, index) => (
      <li key={ index }>
        <img src={ entry.gravatarEmail } alt={ entry.name } />
        <div data-testid={ `player-name-${index}` }>{entry.name}</div>
        <div data-testid={ `player-score-${index}` }>{entry.score}</div>
      </li>
    ));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { listaRanking }
          {' '}
        </ol>
        <button
          data-testid="btn-go-home"
          onClick={ this.onGoHomeButtonClick }
        >
          Go Home
        </button>
      </div>

    );
  }
}

Ranking.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Ranking);
