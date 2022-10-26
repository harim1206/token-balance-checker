async function fetchTopTokens () {
  const endpoint = `https://api.ethplorer.io/getTop?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_API_KEY}&criteria=cap`;
  console.log('endpoint: ', endpoint);
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export const ethplorerLib = {
  fetchTopTokens,
};
