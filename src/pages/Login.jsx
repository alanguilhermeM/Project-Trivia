import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     name: '',
  //     email: '',
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   // this.handleSubmit = this.handleSubmit.bind(this);
  // }

  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const { name, email } = this.state;
  //   const { onSubmit, history } = this.props;
  //   const personalData = { email, name };
  //   onSubmit(personalData);
  //   history.push('/game');
  // }

  handleClick = async () => {
    const api = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(api);
    const data = await response.json();
    localStorage.setItem('token', data.token);
    const { name, email } = this.state;
    const { onSubmit, history } = this.props;
    const personalData = { email, name };
    onSubmit(personalData);
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    const isDisabled = !name || !email || !isValidEmail;

    return (
      <div className="App">
        <form className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <label htmlFor="name">
            <input
              name="name"
              type="text"
              placeholder="Nome"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            <input
              name="email"
              type="email"
              placeholder="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => {
    dispatch(submitLogin(data));
  },
});

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
