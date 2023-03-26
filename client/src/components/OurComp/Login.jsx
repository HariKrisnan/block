import React, { Component } from "react";
import Web3 from "web3";
import truffleContract from "@truffle/contract";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";


class Login extends Component {
    state = {
      storageValue: [],
      web3: null,
      accounts: null,
      contract: null,
      newValue: "",
      name:"",
    };
    componentDidMount = async () => {
        try {
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.display = this.display.bind(this);
          const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
          const accounts = await web3.eth.getAccounts();
          //console.log(accounts[0]);
          const Contract = truffleContract(SimpleStorageContract);
          Contract.setProvider(web3.currentProvider);
          const instance = await Contract.deployed();
          this.setState({ web3, accounts, contract: instance }, this.runExample);
          // while (true) {
          // this.handleChange.bind(this);
          this.display();
          // break;
          // }
        } catch (error) {
          console.log(error);
        }
      };
      async display() {
        if (this.state.contract) {
          const { contract } = this.state;
          const nam = await contract.giveName(this.state.accounts[0]);
          console.log(this.state.posts);
        this.state.name=nam;
      this.setState({ nam }, this.runExample);
      console.log(this.state.name);
        }
        }
        handleChange(event) {
            this.setState({ newValue: event.target.value });
          }
          async handleSubmit(event) {
            event.preventDefault();
            const { accounts, contract } = this.state;
            await contract.setName(this.state.newValue,{
                from: this.state.accounts[0],
              });
            console.log(accounts[0]);
            this.display();
            // const response = await contract.retrieveall();
            // this.setState({ storageValue: response });
            this.setState({ newValue: "" });
            //console.log(this.state.storageValue);
          }
          render() {
            if (!this.state.web3) {
              return <div>Loading...</div>;
            }
            return (
              <div className="Login">
                <div >
                <h1 style={{paddingTop:"60px"}}>
                  Account details:
                  <p style={{ paddingRight: "20px" }}>Account: {this.state.accounts[0]}</p>
                  Name: {this.state.name}
                </h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    value={this.state.newValue}
                    onChange={this.handleChange}
                    style={{ margin: "10px" }}
                    // .bind(this)
                  />
                  <input type="submit" value="Change Username" />
                </form>

                  {/* {this.state.storageValue} */}
              </div>
            );
          }         

}
export default Login;