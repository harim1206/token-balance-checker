import { React } from 'React';
import './TokenBalance.scss';
export default function TokenBalance ({ tokenBalanceData, ENSName }) {
  return (
    <div className="token-balance" data-testid="token-balance">
      <div className="token-balance__group">
        <p className="label">ENS Name / Address</p>
        <div className="text">{ENSName}</div>
      </div>
      <div className="token-balance__group">
        <p className="label">Token</p>
        <div className="text">{tokenBalanceData.name}</div>
      </div>
      <div className="token-balance__group">
        <p className="label">
          Quantity <span className="symbol"> ({tokenBalanceData.symbol})</span>
        </p>
        <div className="text">{tokenBalanceData.balance}</div>
      </div>
    </div>
  );
}
