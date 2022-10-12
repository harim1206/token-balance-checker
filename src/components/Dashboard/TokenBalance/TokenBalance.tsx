import React, {} from 'react';
import styles from './TokenBalance.module.scss';

type TokenBalanceData = {
  name: string,
  symbol: string,
  balance: number
}

export default function TokenBalance ({ tokenBalanceData, ENSName }: { tokenBalanceData: TokenBalanceData, ENSName: string }) {
  return (
    <div className={styles.tokenBalance} data-testid="token-balance">
      <div className={styles.tokenBalanceGroup}>
        <p className={styles.label}>ENS Name / Address</p>
        <div className={styles.text}>{ENSName}</div>
      </div>
      <div className={styles.tokenBalanceGroup}>
        <p className={styles.label}>Token</p>
        <div className={styles.text}>{tokenBalanceData.name}</div>
      </div>
      <div className={styles.tokenBalanceGroup}>
        <p className={styles.label}>
          Quantity <span className="symbol"> ({tokenBalanceData.symbol})</span>
        </p>
        <div className={styles.text}>{tokenBalanceData.balance}</div>
      </div>
    </div>
  );
}