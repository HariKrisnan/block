import React, { Component } from "react";
import Web3 from "web3";
import truffleContract from "@truffle/contract";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";

class Post extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    storageValue: [],
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
      //console.log(accounts[0]);
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
    await contract.write(this.state.newValue, { from: accounts[0] });
    const response = await contract.read();
    this.setState({ storageValue: response });
    this.setState({ newValue: "" });
  }
  runExample = async () => {
    const { contract } = this.state;
    const response = await contract.read();
    this.setState({ storageValue: response });
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading...</div>;
    }
    return (
      <div className="Post">
        <h1>Posts</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newValue}
            onChange={this.handleChange.bind(this)}
          />
          <input type="submit" value="Submit" />
        </form>
        <div>
          {this.state.storageValue.map((p) => (
            <p>{p}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default Post;
