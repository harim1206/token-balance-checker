import "./TokenBalance.scss";
export default function TokenBalance({ tokenData, ENSName }) {
  return (
    <div className="token-balance">
      <div className="token-balance__group">
        <p className="label">ENS Name</p>
        <div className="text">{ENSName}</div>
      </div>
      <div className="token-balance__group">
        <p className="label">Token</p>
        <div className="text">{tokenData.name}</div>
      </div>
      <div className="token-balance__group">
        <p className="label">Quantity</p>
        <div className="text">
          {tokenData.balance}
          <span className="symbol"> {tokenData.symbol}</span>
        </div>
      </div>
    </div>
  );
}
