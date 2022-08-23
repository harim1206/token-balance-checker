export default function UserAddressInput({
  userAddress,
  handleSubmit,
  handleInputChange,
}) {
  return (
    <form onSubmit={handleSubmit}>
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
  );
}
