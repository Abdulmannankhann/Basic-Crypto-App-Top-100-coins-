import "./App.css";
import { useEffect, useState } from "react";
import * as Axios from "axios";
import Coin from "./components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const filteredCoin = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  function handleChange(event) {
    setSearchWord(event.target.value);
  }

  const displayCoins = filteredCoin.map((coin) => {
    return (
      <Coin
        key={coin.id}
        name={coin.name}
        icon={coin.icon}
        price={coin.price}
        symbol={coin.symbol}
      />
    );
  });
  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Enter coin name..."
          onChange={handleChange}
        ></input>
      </div>
      <div className="cryptoDisplay">{displayCoins}</div>
    </div>
  );
}

export default App;
