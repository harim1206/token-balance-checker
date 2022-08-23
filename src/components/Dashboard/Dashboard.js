// import TokenBalanceDisplay from "./TokenBalanceDisplay";
// import TokenAddressInput from "./TokenAddressInput";
// import UserAddressInput from "./UserAddressInput";
import "./Dashboard.scss";
import { useState } from "react";
import { ethersLib } from "../../library/ethers";
import useForm from "../../library/useForm";
import AddressInput from "./AddressInput/AddressInput";
import TokenBalance from "./TokenBalance/TokenBalance";

export default function Dashboard() {
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    balance: 0,
  });
  const [ENSName, setENSName] = useState("");

  /*
    Tether:
    DAI:
    Chainlink: 0x514910771AF9Ca656af840dff83E8264EcF986CA
  */
  const { inputs, handleInputChange } = useForm({
    userAddress: "0x994da0c3437a823F9e47dE448B62397D1bDfDdBa",
    tokenAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  });

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
    } = await ethersLib.getTokenBalance(
      inputs.userAddress,
      inputs.tokenAddress
    );

    setTokenData({
      name,
      symbol,
      balance,
    });
  }

  async function getENSname() {
    const name = await ethersLib.resolveENS(inputs.userAddress);

    setENSName(name);
  }

  return (
    <div className="dashboard">
      <AddressInput
        tokenAddress={inputs.tokenAddress}
        userAddress={inputs.userAddress}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <TokenBalance tokenData={tokenData} ENSName={ENSName} />
    </div>
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
