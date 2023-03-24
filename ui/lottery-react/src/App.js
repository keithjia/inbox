import logo from './logo.svg';
import './App.css';
import web3 from "./web3";
import lottery from './lottery';
import React, { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [manager, setManager] = useState();
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);

      setManager(await lottery.methods.manager().call());
      setPlayers(await lottery.methods.getPlayers().call());
      setBalance(await lottery.methods.getTotalPrizePool().call());

      setLoading(false);
    })();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],
      value: value
    });
  };

  return (

    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Manager is: {loading ? "..." : manager}
        </p>
        <p>
          Total pool is: {loading ? "..." : balance}
        </p>
        <p>
          Players are:
          <div>
            {loading ? "...": players.map((e, i) => { return <div key={i}>{e}</div>;})} 
          </div>
        </p>
        <hr></hr>
        <form onSubmit={onSubmit}>
          <h4>Enter Lottery</h4>
          <input onChange={event => setValue(event.target.value)} value={value}/>
          <button>enter</button>
        </form>
        <p>
          Edit <code>src/App.js</code> and save to reload. this is pretty cool
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
