import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

const URL = 'https://api.exchangerate.host/latest'

function App() {

  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  return (
    <div id="container">
      <form onSubmit={convert}>
        <div style={{margin: 30}}>
          <label style={{margin: 10}}>Eur</label>
          <input type="number" step="0,01" value={eur} onChange={e => setEur(e.target.value)}></input>
          <output></output>
        </div>
        <div style={{margin: 30}}>
        <label>Gbp </label>
        <output>{gbp.toFixed(2)} £</output>
        </div>
        <div style={{margin: 30}}>
        <button>Calculate</button>
        </div>
      </form>
    </div>
  );

async function convert(e) {
  e.preventDefault();
  try {
    const address = URL;
    const response = await fetch(address);

    if (response.ok) {
      const json = await response.json();
      console.log(json.rates.GBP);
      setRate(json.rates.GBP);

      setGbp(eur * json.rates.GBP);
    } else {
      alert('Error retrieving exchange rate.');
      console.log(response);
    }
  } catch (err) {
    alert(err);
  }
}
}

export default App;
