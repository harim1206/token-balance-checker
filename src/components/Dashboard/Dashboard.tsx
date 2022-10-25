import styles from './Dashboard.module.scss';
import React, { useState, useEffect } from 'react';
import { ethersLib } from '../../library/ethers';
import { ethplorerLib } from '../../library/ethplorer';
import AddressInput from './AddressInput/AddressInput';
import TokenBalance from './TokenBalance/TokenBalance';
import SelectToken from './SelectToken/SelectToken';
import topTokensData from '../../library/data.json';

const initialTokenBalanceState = {
  name: '',
  symbol: '',
  balance: 0
};

export default function Dashboard () {
  const [tokensData, setTokensData] = useState(topTokensData.tokens);
  const [tokenBalanceData, setTokenBalanceData] = useState(
    initialTokenBalanceState
  );
  const [tokenBalanceError, setTokenBalanceError] = useState(false);
  const [ENSName, setENSName] = useState('');

  const [inputs, setInputs] = useState({
    userAddress: '',
    tokenAddress: '',
    tokenName: 'Ethereum',
    tokenSymbol: 'ETH',
  });

  const [inputValid, setInputValid] = useState({
    userAddress: true,
    tokenAddress: true
  });
  const [selectTokenView, setSelectTokenView] = useState(false)

  useEffect(() => {
    async function fetchTopTokens () {
      const endpoint = 'https://api.ethplorer.io/getTopTokens?apiKey=EK-cu87W-1mdCq37-mhSWj';

      const response = await fetch(endpoint);
      const data = await response.json();
      setTokensData(data.tokens);
    }

    fetchTopTokens()
      .catch(console.error);
  }, []);

  function handleInputChange (e: React.ChangeEvent<HTMLInputElement>): void {
    if (!e.target) return;
    const { value, name } = e.target;
    setTokenBalanceData(initialTokenBalanceState);

    ethersLib.isAddress(value) || value === ''
      ? setInputValid({ ...inputValid, [name]: true })
      : setInputValid({ ...inputValid, [name]: false });

    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    getTokenBalance();
    getENSname();
  }

  async function getTokenBalance () {
    try {
      const {
        name,
        symbol,
        tokenBalance: balance
      } = await ethersLib
        .getTokenBalance(inputs.userAddress, inputs.tokenAddress);

      setTokenBalanceError(false);
      setTokenBalanceData({
        name,
        symbol,
        balance
      });
    } catch (err) {
      setTokenBalanceError(true);
    }
  }

  async function getENSname () {
    const name = await ethersLib.resolveENS(inputs.userAddress);

    setENSName(name);
  }

  function handleTokenClick (e: React.MouseEvent<HTMLDivElement>) {
    const symbol = e.currentTarget.getAttribute('data-symbol') || '';
    const token = tokensData.find(token => token.symbol === symbol);
    const address = token ? token.address : '';
    const name = token ? token.name : '';

    setInputs({ ...inputs, tokenAddress: address, tokenName: name, tokenSymbol: symbol });
    setSelectTokenView(false);
  }

  // Evaluates true if the token data is populated, and there is no error from the get token balance request, and if both inputs are valid
  const showTokenBalance =
    tokenBalanceData.name &&
    !tokenBalanceError &&
    inputValid.userAddress &&
    inputValid.tokenAddress;

  return (
    <main className={styles.dashboard}>
      <h1>Token Balance Checker</h1>
      <div className={styles.assetLabel} onClick={() => setSelectTokenView(true)}>
        {inputs.tokenName} - <span>{inputs.tokenSymbol}</span>
      </div>
      <SelectToken selectTokenView={selectTokenView} tokens={tokensData} handleTokenClick={handleTokenClick}/>
      <AddressInput
        tokenAddress={inputs.tokenAddress}
        userAddress={inputs.userAddress}
        inputValid={inputValid}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {showTokenBalance && (
        <TokenBalance tokenBalanceData={tokenBalanceData} ENSName={ENSName} />
      )}
      {tokenBalanceError && (
        <div className={styles.tokenBalanceError}>
          <p>No result from input addresses</p>
        </div>
      )}
    </main>
  );
}
