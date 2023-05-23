import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Questions extends Component {
  state = {
    perguntas: [],
    indiceAtual: 0,
    perguntasCarregadas: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await this.fetchApi(token);
  }

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
    const { perguntas, indiceAtual, perguntasCarregadas } = this.state;
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
                    <button data-testid="correct-answer" key={ index }>
                      {opcao.answers}
                    </button>
                  );
                }
                return (
                  <button data-testid={ `wrong-answer-${index}` } key={ index }>
                    {opcao}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
