import React from 'react';
import styles from './AddressInput.module.scss';

interface AddressInputProps {
  tokenAddress: string;
  userAddress: string;
  inputValid: {
    userAddress: boolean,
    tokenAddress: boolean,
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddressInput ({
  tokenAddress,
  userAddress,
  inputValid,
  handleSubmit,
  handleInputChange,
}: AddressInputProps) {
  // Evaluates true if both inputs are invalid, or if token address length is 0 or if user address length is 0 => we don't want to show the error messages on the empty input fields, but we also don't want to enable the button with empty input fields
  const buttonDisabled =
    !(inputValid.userAddress && inputValid.tokenAddress) ||
    !tokenAddress.length ||
    !userAddress.length;

  return (
    <form className={styles.addressInput} onSubmit={handleSubmit}>
      <div className={styles.addressInputGroup}>
        <label htmlFor="token-address">
          Token Address <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="token-address"
          name="tokenAddress"
          placeholder="0x.."
          data-testid="token-address"
          value={tokenAddress}
          onChange={handleInputChange}
        />
        <p className={inputValid.tokenAddress ? `${styles.error} ${styles.hidden}` : styles.error}>
          Please enter a valid token address
        </p>
      </div>
      <div className={styles.addressInputGroup}>
        <label htmlFor="user-address">
          User Address <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="user-address"
          name="userAddress"
          placeholder="0x.."
          data-testid="user-address"
          value={userAddress}
          onChange={handleInputChange}
        />
        <p className={inputValid.userAddress ? `${styles.error} ${styles.hidden}` : styles.error}>
          Please enter a valid user address
        </p>
      </div>
      <div className={styles.addressInputSubmit}>
        <button type="submit" disabled={buttonDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
}
