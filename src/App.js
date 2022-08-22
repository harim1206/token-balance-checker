import "./App.css";
import Dashboard from "./components/Dashboard";
import { ethersLib } from "./library/ethers";

function App() {
  ethersLib.getTokenBalance();

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
