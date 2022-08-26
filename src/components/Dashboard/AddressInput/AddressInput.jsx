import { React } from 'react';
import './AddressInput.scss';
export default function AddressInput ({
  tokenAddress,
  userAddress,
  inputValid,
  handleSubmit,
  handleInputChange,
}) {
  // Evaluates true if both inputs are invalid, or if token address length is 0 or if user address length is 0 => we don't want to show the error messages on the empty input fields, but we also don't want to enable the button with empty input fields
  const buttonDisabled =
    !(inputValid.userAddress && inputValid.tokenAddress) ||
    !tokenAddress.length ||
    !userAddress.length;

  return (
    <form className="address-input" onSubmit={handleSubmit}>
      <div className="address-input__group">
        <label htmlFor="token-address">
          Token Address <span className="required">*</span>
        </label>
        <input
          type="text"
          className="token-address"
          name="token-address"
          placeholder="0x.."
          data-testid="token-address"
          value={tokenAddress}
          onChange={handleInputChange}
        />
        <p className={inputValid.tokenAddress ? 'error hidden' : 'error'}>
          Please enter a valid token address
        </p>
      </div>
      <div className="address-input__group">
        <label htmlFor="user-address">
          User Address <span className="required">*</span>
        </label>
        <input
          type="text"
          className="user-address"
          name="user-address"
          placeholder="0x.."
          data-testid="user-address"
          value={userAddress}
          onChange={handleInputChange}
        />
        <p className={inputValid.userAddress ? 'error hidden' : 'error'}>
          Please enter a valid user address
        </p>
      </div>
      <div className="address-input__submit">
        <button type="submit" disabled={buttonDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
}
