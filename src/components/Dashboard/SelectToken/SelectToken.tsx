import React from 'react';
import styles from './SelectToken.module.scss';

interface SelectTokenProps {
  tokens: any;
  selectTokenView: boolean;
  handleTokenClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function SelectToken ({ tokens, selectTokenView, handleTokenClick }: SelectTokenProps) {
  const assetRows = tokens.map((token: { symbol: string; name: string; address: string; }, i: React.Key | null | undefined) => {
    const symbol = token.symbol.length > 5 ? token.name : token.symbol;
    return (
      <div key={i} className={styles.assetRow} data-symbol={token.symbol} onClickCapture={handleTokenClick}>
        <div className={styles.tokenName}>{token.name} - <span>{symbol}</span></div>
      </div>
    );
  });

  return (
    <div className={ selectTokenView ? `${styles.selectToken} ${styles.visible}` : styles.selectToken }>
      <div className={styles.container}>
        {assetRows}
      </div>
      <div className={styles.bottomShadow}></div>
    </div>
  );
}
