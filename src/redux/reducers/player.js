import { SCORE, RESET_SCORE, ASSERTIONS } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      name: action.payload.name,
      assertions: action.payload.assertions || 0,
      // score: action.payload.score || 0, // ADICIONEI O 0 POIS QUANDO REALIZA O LOGIN NAO RECEBE SCORE NO PAYLOAD, RETORNAVA UNDEFINED
      gravatarEmail: action.payload.gravatarEmail,
    };
  case SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.assertions,
    };
  default:
    return state;
  }
};

export default player;
