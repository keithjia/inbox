import logo from './logo.svg';
import './App.css';
import web3 from "./web3";
import lottery from './lottery';
import React, { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [isEntering, setIsEnter] = useState(false);

  const [manager, setManager] = useState();
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [value, setValue] = useState("");
  const [message, setMsg] = useState("");


  useEffect(() => {
    (async () => {
      setLoading(true);
      setIsEnter(false);

      setManager(await lottery.methods.manager().call());
      setPlayers(await lottery.methods.getPlayers().call());
      setBalance(await lottery.methods.getTotalPrizePool().call());

      setLoading(false);
    })();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    setMsg( "waiting on trx success");
    setIsEnter(true);

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    await lottery.methods.enter().send({
      from: accounts[0],
      gas: 1000000,
      value: value
    });

    setMsg("you've been entered");

    setPlayers(await lottery.methods.getPlayers().call());
    setBalance(await lottery.methods.getTotalPrizePool().call());
    setIsEnter(false);

  };

  const onPickWinner = async (event)=> {
    //const accounts = await web3.eth.getAccounts();
    setMsg( "drawing form a pool ...");
    await lottery.methods.pickWinner().send({from: manager});

    setMsg("winner drawn!!");
    setPlayers(await lottery.methods.getPlayers().call());
    setBalance(await lottery.methods.getTotalPrizePool().call());
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
        {isEntering ? <div>wait...</div> :
          <form onSubmit={onSubmit}>
          <h4>Enter Lottery</h4>
          <input onChange={event => setValue(event.target.value)} value={value}/>
          <button>enter</button>
        </form> 
        }
          
        
        <h2>{message}</h2>
        <hr></hr>
        <h4>pick winner</h4>
        <button onClick={onPickWinner}>Go!</button>
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
