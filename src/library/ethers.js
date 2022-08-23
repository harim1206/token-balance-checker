import { ethers } from "ethers";

const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

async function getTokenBalance(userAddress, tokenAddress) {
  const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ];

  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const tokenBalance = await contract.balanceOf(userAddress);
  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();

  // console.log("decimals: ", decimals.toNumber());

  return {
    name,
    symbol,
    tokenBalance: tokenBalance / 10 ** decimals,
  };
}

async function resolveENS(userAddress) {
  const response = await provider.lookupAddress(userAddress);
  return response ?? userAddress;
}

export const ethersLib = {
  getTokenBalance,
  resolveENS,
};
