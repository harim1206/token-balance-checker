# Matcha - Token Balance Checker

## Installation

1. `npm install` - to install the npm packages
2. `npm start` - to run the development environment on localhost
3. `npm test` - to run the react test suites

## Project Description
**Tools used** 

React, ES6+, SASS, Ethers.js, create-react-app, Jest, React testing library

**Ethers.js (vs. web3.js, Etherscan API, Ethplorer API)**

Initially I researched for popular API’s to browse blockchain data that provided an endpoint to retrieve the token balance, and found Etherscan and Ethplorer API’s. However, when I looked into the ENS name resolution, neither provided this and I also couldn’t find alternative API’s to accomplish this.

I learned the best approach to accomplishing the objective would to interact with the Ethereum blockchain directly using a library like web3.js or ethers.js. Upon browsing the documentation for both, I decided on using ether.js as the syntax seemed more straightforward and easier to understand. I especially appreciated that ethers provides human-readable ABI, which was more approchable for a first time user. 

I implemented the connection using ethers.js’s JSON-RPC API using a node provided by Infura. Using ethers also brings the benefits of higher request and rate limits, and provides more control and flexibility for building new features in the future as you are not limited by the available endpoints provided by the API services.

**Component Architecture**

The feature requirements implied that the token address should be provided (& hard-coded in the codebase) as a prop to the input component. Instead of the token contract address being hard-coded, I decided to build a second input component to empower the user to specify the ERC20 token, as well as the user address.

With this addition, I revised the component architecture to the following:

```jsx
function Dashboard () {
	const [inputs, setInputs] = useState({ tokenAddress: '...', userAddress'...'})
	const [tokenBalanceData, setTokenBalanceData] = useState({...})

	function handleInputChange() {...}
	function handleSubmit() {...}

	return() {
		<AddressInput inputs={...} handleInputChange={...} handleSubmit={...}/>
		<TokenBalance tokenBalanceData={...}/>
}
```

<AddressInput /> renders a form that contains two input elements for token address and user address, and a submit button. The input handler and the submit handler is managed by the parent <Dashboard/> component. The submit handler fetches and sets the token balance data, and passes it down to the <TokenBalance/> component for display.


## Callouts

- Accessibility
- Debounce Input Handler
- Additional Tests
- Better token address input UI (dropdown, select, search)
- Typescript Implementation
- API Key security