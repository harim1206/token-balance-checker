Token Balance Checker

## Project Description
Token Balance Checker is a UI to check token balances of a specified ERC20 Token and an Ethereum User Address. It is built with React, TypeScript, NextJS, SASS, Ethers.js, Jest, and React Testing Library

The app utilizes Ethers.js to interact with the Ethereum blockchain to retrieve the token information. You can enter the ERC20 Token contract address manually, or select one from the select module that shows the 50 tokens with the highest market capitalization.

As an example, try selecting 'Ethereum' from the select module, and enter `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` in the user address!

## Installation

1. `npm install` - to install the npm packages
2. `npm build` - to run the build command
3. `npm dev` - to start the development environment
4. `npm test` - to run the react test suites

### Node version requirements

This project was developed on Node v14.17.6 & npm v6.14.15

### Test inputs of valid addresses
**Token Contract Addresses**
- **USD**: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- **DAI**: `0x6B175474E89094C44Da98b954EedeAC495271d0F`
- **Chainlink**: `0x514910771AF9Ca656af840dff83E8264EcF986CA`

**ENS Name & User Addresses**
- **vitalik.eth**: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- **k33s.eth**: `0x994da0c3437a823F9e47dE448B62397D1bDfDdBa`
- **daidai.eth**: `0x213657bCcC5CF8b74455d110C11D5A8eD6241DEC`
- **unregistered**: `0x485b875e46c268C5c95815532C5Bba0F819997ea`