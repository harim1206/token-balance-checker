import { React } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ethersLib } from '../library/ethers';
import Dashboard from '../components/Dashboard/Dashboard';

test('Entering valid addresses displays a valid token balance display', async () => {
  render(<Dashboard />);
  // mock token balance / ens name fetch response
  const tokenBalanceResp = {
    name: 'ChainLink Token',
    symbol: '',
    tokenBalance: 2556,
  };
  const ensNameResp = 'harim';

  // mock token balance / ens name fetch
  jest.spyOn(ethersLib, 'getTokenBalance').mockResolvedValue(tokenBalanceResp);
  jest.spyOn(ethersLib, 'resolveENS').mockResolvedValue(ensNameResp);

  const validTokenAddress = '0x514910771AF9Ca656af840dff83E8264EcF986CA';
  const validUserAddress = '0x485b875e46c268C5c95815532C5Bba0F819997ea';
  const tokenAddress = screen.getByRole('textbox', {
    name: /token address \*/i,
  });
  const userAddress = screen.getByRole('textbox', { name: /user address \*/i });
  const submit = screen.getByRole('button', { name: /submit/i });

  // simulate user entering address values and hitting submit
  userEvent.type(tokenAddress, validTokenAddress);
  userEvent.type(userAddress, validUserAddress);
  userEvent.click(submit);

  await waitFor(() => {
    expect(screen.getByText(/ENS Name/)).toBeInTheDocument();
  });

  expect(screen.getByText('harim')).toBeInTheDocument();
  expect(screen.getByText('ChainLink Token')).toBeInTheDocument();
  expect(screen.getByText('2556')).toBeInTheDocument();
});

test('Entering invalid addresses displays an error display', async () => {
  render(<Dashboard />);
  // mock token balance error
  jest.spyOn(ethersLib, 'getTokenBalance').mockRejectedValue(new Error());

  const validTokenAddress = '0x485b875e46c268C5c95815532C5Bba0F819997ea';
  const validUserAddress = '0x485b875e46c268C5c95815532C5Bba0F819997ea';
  const tokenAddress = screen.getByRole('textbox', {
    name: /token address \*/i,
  });
  const userAddress = screen.getByRole('textbox', { name: /user address \*/i });
  const tokenAddressError = screen.getByText(
    /please enter a valid token address/i
  );
  const userAddressError = screen.getByText(
    /please enter a valid user address/i
  );
  const submit = screen.getByRole('button', { name: /submit/i });

  // simulate user entering address values and hitting submit
  userEvent.type(tokenAddress, validTokenAddress);
  userEvent.type(userAddress, validUserAddress);
  userEvent.click(submit);

  expect(tokenAddressError).toHaveClass('hidden');
  expect(userAddressError).toHaveClass('hidden');

  await waitFor(() => {
    expect(
      screen.getByText(/No result from input addresses/)
    ).toBeInTheDocument();
  });
});

test('Entering addresses in invalid format shows error states', () => {
  render(<Dashboard />);

  const invalidAddress = 'xyz';
  const tokenAddress = screen.getByRole('textbox', {
    name: /token address \*/i,
  });
  const userAddress = screen.getByRole('textbox', { name: /user address \*/i });
  const submit = screen.getByRole('button', { name: /submit/i });
  const tokenAddressError = screen.getByText(
    /please enter a valid token address/i
  );
  const userAddressError = screen.getByText(
    /please enter a valid user address/i
  );

  // simulate user entering address values and hitting submit
  userEvent.type(tokenAddress, invalidAddress);
  userEvent.type(userAddress, invalidAddress);

  expect(submit).toBeDisabled();
  expect(tokenAddressError).not.toHaveClass('hidden');
  expect(userAddressError).not.toHaveClass('hidden');
});
