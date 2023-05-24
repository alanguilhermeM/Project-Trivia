import { MD5 } from 'crypto-js'; // RODAR NPM INSTALL PARA INSTALAR AS NOVAS DEPENDENCIAS

export const submitLogin = (payload) => {
  const { email, ...rest } = payload;
  const gravatarEmail = MD5(email.trim().toLowerCase()).toString();

  return {
    type: 'LOGIN',
    payload: { ...rest, gravatarEmail },
  };
};

export const RESET_SCORE = 'RESET_SCORE';

export const ResetScore = () => ({
  type: RESET_SCORE,
});
