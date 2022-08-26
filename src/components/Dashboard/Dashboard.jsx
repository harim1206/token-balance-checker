import './Dashboard.scss'
import { React, useState, useEffect } from 'react'
import { ethersLib } from '../../library/ethers'
import useForm from '../../library/useForm'
import AddressInput from './AddressInput/AddressInput'
import TokenBalance from './TokenBalance/TokenBalance'

export default function Dashboard () {
  const initialTokenBalanceState = {
    name: '',
    symbol: '',
    balance: 0
  }
  const [tokenBalanceData, setTokenBalanceData] = useState(
    initialTokenBalanceState
  )
  const [tokenBalanceError, setTokenBalanceError] = useState(false)
  const [ENSName, setENSName] = useState('')
  const { inputs, handleInputChange } = useForm({
    userAddress: '',
    tokenAddress: ''
  })
  const [inputValid, setInputValid] = useState({
    userAddress: true,
    tokenAddress: true
  })

  // on token address input change
  useEffect(() => {
    setTokenBalanceData(initialTokenBalanceState)

    // input address is valid (no error message) if it is a valid eth address, or if it is blank, for initial render
    ethersLib.isAddress(inputs.tokenAddress) || inputs.tokenAddress === ''
      ? setInputValid({ ...inputValid, tokenAddress: true })
      : setInputValid({ ...inputValid, tokenAddress: false })
  }, [inputs.tokenAddress])

  // on user address input change
  useEffect(() => {
    setTokenBalanceData(initialTokenBalanceState)

    // input address is valid (no error message) if it is a valid eth address, or if it is blank, for initial render
    ethersLib.isAddress(inputs.userAddress) || inputs.userAddress === ''
      ? setInputValid({ ...inputValid, userAddress: true })
      : setInputValid({ ...inputValid, userAddress: false })
  }, [inputs.userAddress])

  function handleSubmit (e) {
    e.preventDefault()
    getTokenBalance()
    getENSname()
  }

  async function getTokenBalance () {
    try {
      const {
        name,
        symbol,
        tokenBalance: balance
      } = await ethersLib
        .getTokenBalance(inputs.userAddress, inputs.tokenAddress)

      setTokenBalanceError(false)
      setTokenBalanceData({
        name,
        symbol,
        balance
      })
    } catch (err) {
      setTokenBalanceError(true)
    }
  }

  async function getENSname () {
    const name = await ethersLib.resolveENS(inputs.userAddress)

    setENSName(name)
  }

  // Evaluates true if the token data is populated, and there is no error from the get token balance request, and if both inputs are valid
  const showTokenBalance =
    tokenBalanceData.name &&
    !tokenBalanceError &&
    inputValid.userAddress &&
    inputValid.tokenAddress

  return (
    <main className="dashboard">
      <h1>Token Balance Checker</h1>
      <AddressInput
        tokenAddress={inputs.tokenAddress}
        userAddress={inputs.userAddress}
        inputValid={inputValid}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {showTokenBalance && (
        <TokenBalance tokenBalanceData={tokenBalanceData} ENSName={ENSName} />
      )}
      {tokenBalanceError && (
        <div className="token-balance-error">
          <h3>No result from input addresses</h3>
        </div>
      )}
    </main>
  )
}
