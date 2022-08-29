import React, { Component } from "react";
import Web3 from "web3";
import truffleContract from "@truffle/contract";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";

class Post extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    storageValue: "",
    web3: null,
    accounts: null,
    contract: null,
    newValue: "",
  };
  componentDidMount = async () => {
    try {
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.getAccounts();
      const Contract = truffleContract(SimpleStorageContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      console.log(error);
    }
  };

  handleChange(event) {
    this.setState({ newValue: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { accounts, contract } = this.state;
    await contract.set(this.state.newValue, { from: accounts[0] });
    const response = await contract.get();
    this.setState({ storageValue: response });
  }
  runExample = async () => {
    const { contract } = this.state;
    const response = await contract.get();
    this.setState({ storageValue: response.toNumber() });
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading...</div>;
    }
    return (
      <div className="Post">
        <h1>Welcome to Dapp!</h1>
        <div>Filip likes:{this.state.storageValue}</div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newValue}
            onChange={this.handleChange.bind(this)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Post;
