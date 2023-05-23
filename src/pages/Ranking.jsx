import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    handleLoginClick = () => {
      const { history } = this.props;
      history.push('/');
    };
    return (
      <div>
        <h1>Ranking</h1>
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
