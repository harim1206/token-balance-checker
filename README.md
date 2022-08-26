# Matcha - Token Balance Checker

## Project Description
Token Balance Checker is a UI to check token balances of a specified ERC20 Token and an Ethereum User Address.

## Installation

1. `npm install` - to install the npm packages
2. `npm start` - to run the development environment on localhost
3. `npm test` - to run the react test suites

### Node version requirements

This project was developed on Node v14.17.6 & npm v6.14.15

### Ethers.js Credentials

Retrieving the token balance utilizies ethers.js library, which requires an Infura API key. I stored this in the .env file which is not uploaded to this repository. Please provide an Infura API key in **src/library/ethers.js** to connect via ethers JSON-RPC API, or I can provide mine via email!

For best practices, I am aware that it is not safe to store any private information in the front-end even in a .env file, so in production, this would need to be addressed.

### Test inputs of valid addresses
**Token Contract Addresses**
- **USD**: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- **DAI**: `0x6B175474E89094C44Da98b954EedeAC495271d0F`
- **Chainlink**: `0x514910771AF9Ca656af840dff83E8264EcF986CA`

**ENS Name & User Addresses**
- **k33s.eth**: `0x994da0c3437a823F9e47dE448B62397D1bDfDdBa`
- **daidai.eth**: `0x213657bCcC5CF8b74455d110C11D5A8eD6241DEC`
- **vitalik.eth**: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- **unregistered**: `0x485b875e46c268C5c95815532C5Bba0F819997ea`


## Technical Decisions
### Tools used

React, ES6+, SASS, Ethers.js, create-react-app, Jest, React testing library

### Ethers.js (vs. web3.js, Etherscan API, Ethplorer API)

Initially I researched for popular API’s to browse blockchain data that provided an endpoint to retrieve the token balance, and found Etherscan and Ethplorer API’s. However, when I looked into the ENS name resolution, neither provided this feature and I also couldn’t find alternative API’s to that had it.

I learned the best approach to accomplishing the objective would be to interact with the Ethereum blockchain directly using a library like web3.js or ethers.js. Upon reviewing the documentations, I decided on ether.js as the syntax seemed more straightforward and easier to understand. I especially appreciated that ethers provides human-readable ABI, which was more approchable for a first time user. 

I implemented the connection using ethers.js’s JSON-RPC API using a node provided by Infura. Using ethers also brings the benefits of higher request and rate limits, and provides more control and flexibility for building new features in the future as you are not limited by the available endpoints provided by the API services.

### Component Architecture

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

'AddressInput' renders a form that contains two input elements for token address and user address, and a submit button. The input handler and the submit handler is managed by the parent 'Dashboard' component. The submit handler fetches and sets the token balance data, and passes it down to the 'TokenBalance' component for display.

### Other Decisions
- **create-react-app vs. NextJS** 
  - Given the limited scope of this project to a single component, I have decided to use create-react-app. A tool like NextJS would become a consideration for easily setting up a larger application that requires multiple pages, different rendering methods (server/static/client) & etc.
- **SASS vs. a css framework like Tailwind, Material UI & etc.** 
  - I decided to write the styling from scratch instead of using a CSS framework. A framework might be useful if I was collaborating with a bigger team because it quickly establishes a set of styling guidelines that we can follow without needing to start one from scratch.
- **Separate SASS files vs CSS-in-JS, styled components & etc.**
  - I find separating the CSS from the React components to be cleaner and more maintainable. This is a matter of prefrence, but historically the teams I have worked with preferred this route.
- **ES Lint**
  - standard React linting has been implemented in the project for code styling and the configurations can be found in .eslintrc.js
- **Testing**
  - Testing was written using react-testing-library & Jest

## Callouts / Areas of improvement
- **Testing**
  - implement a more robust test suite & create a test file for each component instead of storing it all at the parent Dashboard component.
- **Check for and implement accessibility practices**
  - Semantic html elements, alt texts, tabbable elemnts, keyboard navigation, color contrast, etc.
- **Debounce Input Handler**
  - Improve performance by debouncing input handlers so that the input handlers only executes once every x milliseconds instead of on every detected change.
- **Improve UX**
  - Better token address input UI (dropdown, select, search) - for example, Ethplorer API has an endpoint for top 50 tokens with the highest transaction amounts that can be leveraged.
  - Include symbols, images, animation, additional data & etc.
- **Typescript Implementation**
  - Implement typescript for scalability, static typing, identifying errors during development & etc.
  - I developed in ES6 for the purposes of speed and intended on implementing TS afterwards, but ran out of time!
  ****