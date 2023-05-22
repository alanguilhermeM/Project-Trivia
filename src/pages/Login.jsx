import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    const isDisabled = !name || !email || !isValidEmail;

    return (
      <form>
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
          disabled={ isDisabled }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
