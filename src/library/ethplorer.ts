async function fetchTopTokens () {
  const endpoint = 'https://api.ethplorer.io/getTopTokens?apiKey=EK-cu87W-1mdCq37-mhSWj';

  const response = await fetch(endpoint);
  const data = await response.json();
  console.log('data here: ', data)
  return data;
}

export const ethplorerLib = {
  fetchTopTokens,
};
