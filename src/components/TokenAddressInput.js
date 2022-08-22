export default function TokenAddressInput({ tokenAddress, handleInputChange }) {
  return (
    <label>
      Token Address
      <input
        type="text"
        id="token-address"
        name="token-address"
        value={tokenAddress}
        onChange={handleInputChange}
      />
    </label>
  );
}
