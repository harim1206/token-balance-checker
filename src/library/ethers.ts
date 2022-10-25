import { ethers } from 'ethers';

// `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`
const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/a7fc233285164a97a2ac707db1f02570'
);

async function getTokenBalance(userAddress: string, tokenAddress: string) {
  const ERC20_ABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function decimals() view returns (uint256)',
    'function balanceOf(address) view returns (uint)',
  ];

  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  let tokenBalance = await contract.balanceOf(userAddress);

  tokenBalance = (tokenBalance / 10 ** decimals).toLocaleString('en', {
    maximumFractionDigits: 18,
  });

  return {
    name,
    symbol,
    tokenBalance,
  };
}

async function resolveENS(userAddress: string) {
  const response = await provider.lookupAddress(userAddress);
  return response ?? userAddress;
}

function isAddress(address: string) {
  return ethers.utils.isAddress(address);
}

export const ethersLib = {
  getTokenBalance,
  resolveENS,
  isAddress,
};
