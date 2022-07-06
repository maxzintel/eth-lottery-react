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
    value: '',
    message: ''
  };

  async componentDidMount() {
    // we dont need to set 'from: account[0]' here because metamasks provider that we are interacting with here has a default: the first account associated with the wallet.
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); // used in tests in other repo! In wei by default.
    
    this.setState({ manager, players, balance });
  }

  // event object here represents the form submission.
  onSubmit = async (event) => {
    // Be aware here of the context of 'this'.
    // this here is set automatically = to our component.
    // Useful when you dont want to have to bind the context within the function call.

    event.preventDefault();

    // Get list of accounts.
    const accounts = await web3.eth.getAccounts();

    // Before entering is complete, communicate that with users.
    this.setState({ message: 'Waiting on transaction success...' });

    // Assume we want to use the first account to enter.
    // Probably easily improved by some call to web3 to grab active account.
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether') // value here is from form below.
    })

    this.setState({ message: 'You have been entered!' });
  }

  render() {
    return (
      <div className="Lottery">
        <h2>Lottery Contract!</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are {this.state.players.length} people entered in the lottery so far, all competing for the grand prize of {web3.utils.fromWei(this.state.balance, 'ether')} eth!</p>
        <hr />
        {/* Send a transaction to the 'enter' function in the solidity code. 
            EVENT HANDLER added to watch for the 'submit' event on the form.
            - every time this event occurs we want to call the relevant fnc in the contract.
        */}
        <form onSubmit={this.onSubmit}>
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
        <h1>
          {this.state.message}
        </h1>
        <h4>
          Time to pick a winner?
        </h4>
        <button>Pick Winner</button>
      </div>
    );
  }
}
export default App;