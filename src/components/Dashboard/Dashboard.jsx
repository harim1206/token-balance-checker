// import TokenBalanceDisplay from "./TokenBalanceDisplay";
// import TokenAddressInput from "./TokenAddressInput";
// import UserAddressInput from "./UserAddressInput";
import "./Dashboard.scss";
import { useState, useEffect } from "react";
import { ethersLib } from "../../library/ethers";
import useForm from "../../library/useForm";
import AddressInput from "./AddressInput/AddressInput";
import TokenBalance from "./TokenBalance/TokenBalance";

export default function Dashboard() {
  const initialTokenBalanceState = {
    name: "",
    symbol: "",
    balance: 0,
  };
  const [tokenBalanceData, setTokenBalanceData] = useState(
    initialTokenBalanceState
  );
  const [tokenBalanceError, setTokenBalanceError] = useState(false);
  const [ENSName, setENSName] = useState("");
  const { inputs, handleInputChange } = useForm({
    userAddress: "",
    tokenAddress: "",
  });
  const [inputValid, setInputValid] = useState({
    userAddress: true,
    tokenAddress: true,
  });

  // on token address input change
  useEffect(() => {
    setTokenBalanceData(initialTokenBalanceState);

    ethersLib.isAddress(inputs.tokenAddress) || inputs.tokenAddress === ""
      ? setInputValid({ ...inputValid, tokenAddress: true })
      : setInputValid({ ...inputValid, tokenAddress: false });
  }, [inputs.tokenAddress]);

  // on user address input change
  useEffect(() => {
    setTokenBalanceData(initialTokenBalanceState);

    ethersLib.isAddress(inputs.userAddress) || inputs.userAddress === ""
      ? setInputValid({ ...inputValid, userAddress: true })
      : setInputValid({ ...inputValid, userAddress: false });
  }, [inputs.userAddress]);

  function handleSubmit(e) {
    e.preventDefault();
    getTokenBalance();
    getENSname();
  }

  async function getTokenBalance() {
    const {
      name,
      symbol,
      tokenBalance: balance,
    } = await ethersLib
      .getTokenBalance(inputs.userAddress, inputs.tokenAddress)
      .catch(handleError);

    function handleError(err) {
      setTokenBalanceError(true);
    }

    setTokenBalanceData({
      name,
      symbol,
      balance,
    });
  }

  async function getENSname() {
    const name = await ethersLib.resolveENS(inputs.userAddress);

    setENSName(name);
  }

  // Evaluates true if the token data is populated, and there is no error from the get token balance request, and if both inputs are valid
  const showTokenBalance =
    tokenBalanceData.name &&
    !tokenBalanceError &&
    inputValid.userAddress &&
    inputValid.tokenAddress;

  return (
    <main className="dashboard">
      <h1>Token Balance Checker</h1>
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
        <main>
          <h3>No result from input addresses</h3>
        </main>
      )}
      <div className="test">
        <h3> for development purposes only</h3>
        <h3> token addresses: </h3>
        <p>USD: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48</p>
        <p>DAI: 0x6B175474E89094C44Da98b954EedeAC495271d0F</p>
        <p>Chainlink: 0x514910771AF9Ca656af840dff83E8264EcF986CA</p>
        <h3> user addresses: </h3>
        <p>k33s.eth: 0x994da0c3437a823F9e47dE448B62397D1bDfDdBa</p>
        <p>daidai.eth: 0x213657bCcC5CF8b74455d110C11D5A8eD6241DEC</p>
        <p>vitalik.eth: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045</p>
        <p>harim: 0x485b875e46c268C5c95815532C5Bba0F819997ea</p>
      </div>
    </main>
  );
}

/*

async function fetchBalance() {
  const ETHERSCAN_API = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${TOKEN_ADDRESS}&address=${inputs.userAddress}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;

  const ETHPLORER_GET_ADDRESS_INFO = `https://api.ethplorer.io/getAddressInfo/${USER_ADDRESS}?apiKey=${ETHPLORER_API_KEY}`;

  const ETHPLORER_GET_TOP_TOKENS = `https://api.ethplorer.io/getTopTokens?apiKey=${ETHPLORER_API_KEY}`;

  const response = await fetch(ETHPLORER_GET_ADDRESS_INFO);
  const data = await response.json();
  const tokens = data.tokens;

  const token = tokens.filter((token) => {
    console.log("token.tokenInfo.address: ", token.tokenInfo.address);
    return token.tokenInfo.address === TOKEN_ADDRESS.toLowerCase();
  })[0];

  const rawBalance = token.balance;
  const decimals = parseInt(token.tokenInfo.decimals);
  const balance = rawBalance / 10 ** decimals;

  console.log("token:", token);

  setBalance(balance);

  console.log("response: ", response);
  console.log("data: ", data);
}

*/
