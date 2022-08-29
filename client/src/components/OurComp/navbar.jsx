import React, { Component } from "react";
import Web3 from "web3";
import "bootstrap/dist/css/bootstrap.min.css";
class Navbar extends Component {
  async loadData() {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    //console.log(this.state.account);
  }
  constructor(props) {
    super(props);
    this.state = {
      account: "",
    };
    this.loadData();
  }
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top text-primary bg-dark flex-md-nowrap p-0 shadow">
        <div>
          <h1 className="text-primary text-right padding-left">Blockers</h1>
        </div>
        <h4 className="text-light">Account: {this.state.account}</h4>
      </nav>
    );
  }
}

export default Navbar;
