import { useState, useEffect } from "react";
import useForm from "../library/useForm";
import UserAddressInput from "./UserAddressInput";
import TokenAddressInput from "./TokenAddressInput";

export default function Dashboard() {
  const ETHERSCAN_API_KEY = `Z2Y1HA9E9BYM5P7IBHZ1432XAV1ZN8MRDP`;
  const ETHPLORER_API_KEY = `EK-cu87W-1mdCq37-mhSWj`;
  const USER_ADDRESS = `0x485b875e46c268C5c95815532C5Bba0F819997ea`;
  const TOKEN_ADDRESS = `0x514910771AF9Ca656af840dff83E8264EcF986CA`;

  const [balance, setBalance] = useState(0);
  const { inputs, handleInputChange } = useForm({
    "user-address": "",
    "token-address": "",
  });

  useEffect(() => {
    console.log("inputs: ", inputs);
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetchBalance();
  }

  async function fetchBalance() {
    const ETHERSCAN_API = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${TOKEN_ADDRESS}&address=${inputs["user-address"]}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;

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

  return (
    <div className="panel">
      <TokenAddressInput
        userAddress={inputs["token-address"]}
        handleInputChange={handleInputChange}
      />
      <UserAddressInput
        userAddress={inputs["user-address"]}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
      <div className="balance-display">
        <h3>{balance}</h3>
      </div>
      <div className="temp">
        <div>USER_ADDRESS: 0x485b875e46c268C5c95815532C5Bba0F819997ea</div>
        <div>TOKEN_ADDRESS: 0x514910771AF9Ca656af840dff83E8264EcF986CA</div>
      </div>
    </div>
  );
}
