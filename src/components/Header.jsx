import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const gravatarProfilePic = `https://www.gravatar.com/avatar/${gravatarEmail}`;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatarProfilePic }
          alt="gravatar-avatar"
        />
        <p data-testid="header-player-name">{name}</p>
        <strong data-testid="header-score">{score}</strong>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Header);
