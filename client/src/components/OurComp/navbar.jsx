import React, { Component } from "react";
import Web3 from "web3";
import "bootstrap/dist/css/bootstrap.min.css";
import contract from "@truffle/contract";
import truffleContract from "@truffle/contract";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";

class Navbar extends Component {
  componentDidMount = async () => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    const { contract } = this.state;
    //console.log(accounts[0]);
    const Contract = truffleContract(SimpleStorageContract);
    Contract.setProvider(web3.currentProvider);
    const instance = await Contract.deployed();
    const accn = await instance.giveName(accounts[0]);
    this.setState({
      account: accounts[0],
      name: accn,
    });

    //console.log(this.state.account);
  };
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      name: "",
    };
  }
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top text-primary bg-dark flex-md-nowrap p-0 shadow">
        <div>
          <h1
            className="text-primary text-right padding-left"
            style={{ paddingLeft: "20px" }}
          >
            Blockers
          </h1>
        </div>
        <h4 className="text-light" style={{ paddingRight: "20px" }}>
          Account: {this.state.account}
          Name: {this.state.name}
        </h4>
      </nav>
    );
  }
}

export default Navbar;
