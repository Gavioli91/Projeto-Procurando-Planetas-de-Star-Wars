import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import App from '../App';

describe('Testa o componente Table', () => {

  it('o componente Table é renderizado', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => testData}));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const tableElement = screen.getByRole('table');
  
  expect(tableElement).toBeInTheDocument();
  });

  it('possui inputs e botões', async () => {
    global.fetch = jest.fn(async () => ({json: async () => testData}));
  render(<App />);

  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const filtrar = screen.getByTestId('button-filter');
  const table = screen.getAllByRole('row');

  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(filtrar).toBeInTheDocument();
  expect(table).toHaveLength(11);
});

it('busca um planeta pelo seu nome', async () => {
  global.fetch = jest.fn(async () => ({json: async () => testData}));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const planetName = screen.getByPlaceholderText(/filtrar por nome/i);
  const table = screen.getAllByRole('row');

  expect(table.length).toBe(11);

  userEvent.type(planetName, 'tat');
  expect(planetName.value).toBe('tat');

  const rowFiltered = screen.getAllByRole('row');
  expect(rowFiltered.length).toBe(2);
});

it('filtra a partir de um número', async () => {
  global.fetch = jest.fn(async () => ({
    json: async () => testData,
  }));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const columnSelect = screen.getByTestId('column-filter');
  const comparisonSelect = screen.getByTestId('comparison-filter');
  const valueSelect = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  userEvent.selectOptions(columnSelect, 'population');
  userEvent.selectOptions(comparisonSelect, 'maior que');
  userEvent.clear(valueSelect);
  userEvent.type(valueSelect, '200000');
  userEvent.click(buttonFilter);

  const rowFiltered = screen.getAllByRole('row');
  await waitFor(() => expect(rowFiltered.length).toBe(7));
});

});
