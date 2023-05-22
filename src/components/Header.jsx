import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    const {name, gravatarEmail, score} = this.props;
    const gravatarProfilePic = `https://www.gravatar.com/avatar/${gravatarEmail}`
        return (
      <header>
        <img data-testid="header-profile-picture"
        src={gravatarProfilePic}
        alt='profile-image'
        />
        <p data-testid="header-player-name">{name}</p>
        <strong data-testid="header-score">{score}</strong>
      </header>
    )
  }
}

const mapStateToProps = ({player}) => ({
  ...player
})

export default connect(mapStateToProps)(Header);
