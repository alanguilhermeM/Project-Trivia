import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe('Testa a página de Login', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        "response_code": 0,
        "response_message": "Token Generated Successfully!",
        "token": "2e7094ef2c52834ae0d61a0396c745ddcac587f3337e07ce80fb70dd5e54fe52"
      }),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Confere se são renderizados 2 inputs na tela de login e se o botão Play está desabilitado.', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByPlaceholderText(/Nome/i);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const buttonPlay = screen.getByRole('button', { name: /Play/i });

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();
  });

  test('Confere se os dados inseridos estão corretos e se o botão Play é habilitado.', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/Nome/i);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const buttonPlay = screen.getByRole('button', { name: /Play/i });

    expect(buttonPlay).toBeDisabled();

    userEvent.type(inputName, 'Ramily Carvalho');
    userEvent.type(inputEmail, 'ramilycarvalho@gmail.com');

    expect(inputName).toHaveValue('Ramily Carvalho');
    expect(inputEmail).toHaveValue('ramilycarvalho@gmail.com');
    expect(buttonPlay).toBeEnabled();
  });

  test('Confere se foi feita uma requisição na API ao clicar no botão.', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/Nome/i);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const buttonPlay = screen.getByRole('button', { name: /Play/i });

    userEvent.type(inputName, 'Ramily Carvalho');
    userEvent.type(inputEmail, 'ramilycarvalho@gmail.com');
    userEvent.click(buttonPlay);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('Redireciona para a página de Configurações ao clicar no botão "Configurações"', () => {
    renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByRole('button', { name: /Configurações/i });

    userEvent.click(buttonSettings);

    expect(screen.getByText(/Setting/i)).toBeInTheDocument();
  });

  test('Submete os dados do formulário ao clicar no botão "Play"', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/Nome/i);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const buttonPlay = screen.getByRole('button', { name: /Play/i });

    userEvent.type(inputName, 'Ramily Carvalho');
    userEvent.type(inputEmail, 'ramilycarvalho@gmail.com');
    userEvent.click(buttonPlay);

  });
});
