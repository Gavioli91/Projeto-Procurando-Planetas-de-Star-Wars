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

  const componentTable = screen.getByRole('table');
  
  expect(componentTable).toBeInTheDocument();
  });

  it('possui inputs', async () => {
    global.fetch = jest.fn(async () => ({json: async () => testData}));
  render(<App />);

  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const filter = screen.getByTestId('button-filter');
  const table = screen.getAllByRole('row');

  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(filter).toBeInTheDocument();
  expect(table).toHaveLength(1);
});

it('buscar um planeta pelo nome', async () => {
  global.fetch = jest.fn(async () => ({json: async () => testData}));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const names = screen.getByTestId('name-filter');
  const table = screen.getAllByRole('row');

  expect(table.length).toBe(11);

  userEvent.type(names, 'tat');
  expect(names.value).toBe('tat');

  const select = screen.getAllByRole('row');
  expect(select.length).toBe(1);
});

it('filtrar por número', async () => {
  global.fetch = jest.fn(async () => ({json: async () => testData}));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.clear(valueFilter);
  userEvent.type(valueFilter, '200000');
  userEvent.click(buttonFilter);

  const select = screen.getAllByRole('row');
  await waitFor(() => expect(select.length).toBe(7));
});

it('filtrar por "menor que"', async () => {
  global.fetch = jest.fn(async () => ({json: async () => testData}));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'menor que');
  userEvent.clear(valueFilter);
  userEvent.type(valueFilter, '200000');
  userEvent.click(buttonFilter);

  const select = screen.getAllByRole('row');
  await waitFor(() => expect(select.length).toBe(2));
});

it('filtrar por "igual a"', async () => {
  global.fetch = jest.fn(async () => ({json: async () => testData}));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'igual a');
  userEvent.clear(valueFilter);
  userEvent.type(valueFilter, '200000');
  userEvent.click(buttonFilter);

  const select = screen.getAllByRole('row');
  await waitFor(() => expect(select.length).toBe(2));
});
});
