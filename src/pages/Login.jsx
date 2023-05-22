import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitLogin } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email } = this.state;
    const { onSubmit } = this.props;
    const personalData = { email, name };

    onSubmit(personalData);
  }

  render() {
    const { name, email } = this.state;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    const isDisabled = !name || !email || !isValidEmail;

    return (
      <form onSubmit={ this.handleSubmit }>
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
          type="submit"
          disabled={ isDisabled }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
