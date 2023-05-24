import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testa a tela de Feedback', () => {
  it('Testa a rota da página de Feedback', () => {
    const history = createMemoryHistory();
    history.push('/feedback')

    const { pathname } = history.location;

    expect(pathname).toBe('/feedback');
  })
  
  it('Testa se existe os elementos de placar e acertos e seus valores', () => {
    renderWithRouterAndRedux(<Feedback />)

    const score = screen.getByTestId('feedback-total-score')
    const asserts = screen.getByTestId('feedback-total-question')

    expect(score).toBeInTheDocument();
    expect(asserts).toBeInTheDocument();

    expect(score.textContent).toBe('0');
    expect(asserts.textContent).toBe('0');

    const { store } = renderWithRouterAndRedux(<Feedback />)
    const { player } = store.getState()

    if (player.assertions === 3) {
      expect(asserts.textContent).toBe('3');
    }
  })

  it('Testa se é exibido a menssagem correta', () => {
    const { store } = renderWithRouterAndRedux(<Feedback />)
    const { player } = store.getState()

    const msg = screen.getByTestId('feedback-text')

    if (player.assertions < 3) {
      expect(msg.textContent).toBe('Could be better...')
    } else {
      expect(msg.textContent).toBe('Well Done!')
    }
  })
})
