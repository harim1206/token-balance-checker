import styles from './Dashboard.module.scss';
import React, { useState, useEffect } from 'react';
import { ethersLib } from '../../library/ethers';
import { ethplorerLib } from '../../library/ethplorer';
import AddressInput from './AddressInput/AddressInput';
import TokenBalance from './TokenBalance/TokenBalance';
import SelectToken from './SelectToken/SelectToken';

interface TokenData {
  name: string;
  symbol: string;
  address: string;
}

const initialTokenBalanceState = {
  name: '',
  symbol: '',
  balance: ''
};

export default function Dashboard () {
  const [tokensData, setTokensData] = useState<TokenData[] | []>([]);
  const [tokenBalanceData, setTokenBalanceData] = useState(
    initialTokenBalanceState
  );
  const [showTokenBalanceError, setShowTokenBalanceError] = useState(false);
  const [ENSName, setENSName] = useState('');
  const [inputs, setInputs] = useState({
    userAddress: '',
    tokenAddress: '',
    tokenName: 'Select Token',
    tokenSymbol: '',
  });
  const [inputValid, setInputValid] = useState({
    userAddress: true,
    tokenAddress: true
  });
  const [selectTokenView, setSelectTokenView] = useState(false);

  useEffect(() => {
    fetchTopTokens()
      .catch(console.error);
  }, []);

  async function fetchTopTokens () {
    const data = await ethplorerLib.fetchTopTokens();
    let tokens: TokenData[] = data.tokens;

    tokens = tokens.map((token: TokenData) => {
      return (
        {
          address: token.address,
          symbol: token.symbol,
          name: token.name
        }
      );
    });

    setTokensData(tokens);
  }

  async function getTokenBalance () {
    try {
      const {
        name,
        symbol,
        balance
      } = await ethersLib
        .getTokenBalance(inputs.userAddress, inputs.tokenAddress);

      setTokenBalanceData({
        name,
        symbol,
        balance
      });
      setShowTokenBalanceError(false);
    } catch (err) {
      setShowTokenBalanceError(true);
    }
  }

  async function getENSname () {
    const name = await ethersLib.resolveENS(inputs.userAddress);
    setENSName(name);
  }

  function handleInputChange (e: React.ChangeEvent<HTMLInputElement>) {
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

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getTokenBalance();
    getENSname();
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
    !showTokenBalanceError &&
    inputValid.userAddress &&
    inputValid.tokenAddress;

  const TokenAssetLabel = (
    <div className={styles.assetLabel} onClick={() => setSelectTokenView(true)}>
      {inputs.tokenName} <span>{inputs.tokenSymbol}</span>
    </div>
  );

  const TokenBalanceError = (
    <div className={styles.tokenBalanceError}>
      <p>No result from input addresses</p>
    </div>
  );

  return (
    <main className={styles.dashboard}>
      <h1>Token Balance Checker</h1>
      {TokenAssetLabel}
      <SelectToken
        selectTokenView={selectTokenView}
        tokens={tokensData}
        handleTokenClick={handleTokenClick}
      />
      <AddressInput
        tokenAddress={inputs.tokenAddress}
        userAddress={inputs.userAddress}
        inputValid={inputValid}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {showTokenBalance ? (<TokenBalance tokenBalanceData={tokenBalanceData} ENSName={ENSName} />) : null}
      {showTokenBalanceError ? (TokenBalanceError) : null}
    </main>
  );
}
