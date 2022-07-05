import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  // Need to do more react learning to know what this is doing.
  state = {
    manager: '',
    players: [],
    balance: '', // balance is not technically a number, its an object wrapped in bignumber.js
    value: ''
  };

  async componentDidMount() {
    // we dont need to set 'from: account[0]' here because metamasks provider that we are interacting with here has a default: the first account associated with the wallet.
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); // used in tests in other repo! In wei by default.
    
    this.setState({ manager, players, balance });
  }

  render() {
    return (
      <div className="Lottery">
        <h2>Lottery Contract!</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are {this.state.players.length} people entered in the lottery so far, all competing for the grand prize of {web3.utils.fromWei(this.state.balance, 'ether')} eth!</p>
        <hr />
        <form>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter:  </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <form>
          
        </form>
      </div>
    );
  }
}
export default App;