export default function TokenBalanceDisplay({
  tokenData,
  ENSName,
  tokenAddress,
  userAddress,
  handleSubmit,
  handleInputChange,
}) {
  return (
    <div className="">
      <form onSubmit={(e) => handleSubmit(e, tokenAddress)}>
        <label htmlFor="user-address">User Address</label>
        <input
          type="text"
          id="user-address"
          name="user-address"
          value={userAddress}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="balance-display">
        <h3>ENS name: {ENSName}</h3>
        <h3>name: {tokenData.name}</h3>
        <h3>symbol: {tokenData.symbol}</h3>
        <h3>balance: {tokenData.balance}</h3>
      </div>
    </div>
  );
}
