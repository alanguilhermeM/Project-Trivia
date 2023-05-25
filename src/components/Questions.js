import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playerAssertions, playerScore } from '../redux/actions';

class Questions extends Component {
  state = {
    perguntas: [],
    indiceAtual: 0,
    perguntasCarregadas: false,
    timeRemaining: 30,
    disabled: false,
    redButtonStates: [],
    next: false,
  };

  timer = null;

  countdown = null;

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await this.fetchApi(token);
    this.startTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearInterval(this.countdown);
  }

  startTimer = () => {
    const COUNTDOWN_TIME = 30000;
    this.setState({ timeRemaining: 30 });
    this.timer = setTimeout(COUNTDOWN_TIME);
    this.startCountdown();
  };

  // resetTimer = () => {
  //   clearTimeout(this.timer);
  //   clearInterval(this.countdown);
  //   this.startTimer();
  // };

  startCountdown = () => {
    const START_COUNTDOWN = 1000;
    this.countdown = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeRemaining === 0) {
          clearInterval(this.countdown);
          this.setState({ disabled: true });
        } else {
          return { timeRemaining: prevState.timeRemaining - 1 };
        }
      });
    }, START_COUNTDOWN);
  };

  handleClick = ({ target }) => {
    const { assertionDispatch } = this.props;
    if (target.id === 'green') {
      const green = document.getElementById('green');
      green.style.backgroundColor = 'green';
      green.style.border = '3px solid rgb(6, 240, 15)';
      const redButtons = document.querySelectorAll('.red');
      redButtons.forEach((button) => {
        button.style.backgroundColor = 'red';
        button.style.border = '3px solid red';
      });
      this.scorePts();
      this.setState({ next: true });
      const assertions = 1;
      assertionDispatch(assertions);
    }
    if (target.className === 'red') {
      const index = parseInt(target.getAttribute('data-index'), 10);

      this.setState((prevState) => {
        const newRedButtonStates = [...prevState.redButtonStates];
        newRedButtonStates[index] = true;
        return { redButtonStates: newRedButtonStates, next: true };
      });

      const redButton = target;
      redButton.style.backgroundColor = 'red';
      redButton.style.border = '3px solid red';

      const green = document.getElementById('green');
      green.style.backgroundColor = 'green';
      green.style.border = '3px solid rgb(6, 240, 15)';
    }
  };

  scorePts = () => {
    const { perguntas, indiceAtual, timeRemaining } = this.state;
    const { dispatchAction } = this.props;
    const perguntaAtual = perguntas[indiceAtual];
    const { difficulty } = perguntaAtual;
    let score;
    const n = 10;
    const n2 = 3;
    switch (difficulty) {
    case 'easy':
      score = n + (timeRemaining + 1);
      break;
    case 'medium':
      score = n + (timeRemaining + 2);
      break;
    case 'hard':
      score = n + (timeRemaining + n2);
      break;
    default:
      break;
    }

    dispatchAction(score);
  };

  nextBtn = () => {
    const { perguntas, indiceAtual } = this.state;
    if (indiceAtual < perguntas.length - 1) {
      this.setState((prevState) => ({
        indiceAtual: prevState.indiceAtual + 1,
      }));
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  shuffleArray = (array) => {
    const half = 0.5;
    return array.sort(() => half - Math.random());
  };

  fetchApi = async (token) => {
    const n = 3;
    try {
      const api = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const response = await fetch(api);
      const data = await response.json();
      const { response_code: responseCode, results } = data;
      if (responseCode === n) {
        const { history } = this.props;
        localStorage.removeItem('token');
        history.push('/');
      } else {
        const perguntasEmbaralhadas = results.map((pergunta) => ({
          ...pergunta,
          incorrect_answers: this.shuffleArray(
            [{ answers: pergunta.correct_answer, correct: true },
              ...pergunta.incorrect_answers],
          ),
        }));
        this.setState({
          perguntas: perguntasEmbaralhadas,
          perguntasCarregadas: true,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { perguntas, indiceAtual,
      perguntasCarregadas, timeRemaining, disabled, next } = this.state;
    const perguntaAtual = perguntas[indiceAtual];
    return (
      <div>
        {perguntasCarregadas ? (
          <div>
            <h2 data-testid="question-category">{perguntaAtual.category}</h2>
            <h4 data-testid="question-text">{perguntaAtual.question}</h4>
            <div data-testid="answer-options">
              {/* <button data-testid="correct-answer">{perguntaAtual.correct_answer}</button> */}
              {perguntaAtual.incorrect_answers.map((opcao, index) => {
                if (opcao.correct) {
                  return (
                    <button
                      id="green"
                      onClick={ (e) => this.handleClick(e) }
                      data-testid="correct-answer"
                      key={ index }
                      disabled={ disabled }
                    >
                      {opcao.answers}
                    </button>
                  );
                }
                return (
                  <button
                    className="red"
                    onClick={ (e) => this.handleClick(e) }
                    data-testid={ `wrong-answer-${index}` }
                    key={ index }
                    disabled={ disabled }
                  >
                    {opcao}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
        {
          next ? (
            <button
              onClick={ this.nextBtn }
              data-testid="btn-next"
            >
              Next

            </button>
          ) : (
            <div>
              Time Remaining:
              {' '}
              {timeRemaining}
            </div>
          )
        }
        {' '}
      </div>
    );
  }
}
Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchAction: PropTypes.func.isRequired,
  assertionDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchAction: (score) => {
    dispatch(playerScore(score));
  },
  assertionDispatch: (score) => {
    dispatch(playerAssertions(score));
  },
});

export default connect(null, mapDispatchToProps)(Questions);
