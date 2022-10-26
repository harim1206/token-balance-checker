async function fetchTopTokens () {
  const endpoint = 'https://api.ethplorer.io/getTop?apiKey=EK-cu87W-1mdCq37-mhSWj&criteria=cap';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export const ethplorerLib = {
  fetchTopTokens,
};
