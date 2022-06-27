import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { manager: '' };
  }
  async componentDidMount() {
    // we dont need to set 'from: account[0]' here because metamasks provider that we are interacting with here has a default: the first account associated with the wallet.
    const manager = await lottery.methods.manager().call();

    this.setState({ manager });
  }

  render() {
    return (
      <div className="Lottery">
        <h2>Lottery Contract!</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
}
export default App;