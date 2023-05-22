const initialState = {
  name: '', // nome-da-pessoa,
  assertions: 0, // número-de-acertos,
  score: 0, // pontuação,
  gravatarEmail: '', // email-da-pessoa,
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      score: action.payload.score,
      gravatarEmail: action.payload.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
