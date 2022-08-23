import "./AddressInput.scss";
export default function AddressInput({
  tokenAddress,
  userAddress,
  handleSubmit,
  handleInputChange,
}) {
  return (
    <form className="address-input" onSubmit={handleSubmit}>
      <div className="address-input__group">
        <label htmlFor="token-address">Token Address</label>
        <input
          type="text"
          className="token-address"
          name="token-address"
          value={tokenAddress}
          onChange={handleInputChange}
        />
      </div>
      <div className="address-input__group">
        <label htmlFor="user-address">User Address</label>
        <input
          type="text"
          className="user-address"
          name="user-address"
          value={userAddress}
          onChange={handleInputChange}
        />
      </div>
      <div className="address-input__submit">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
