import React, { Component } from "react";
import Web3 from "web3";
import truffleContract from "@truffle/contract";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";

class Post extends Component {
  state = {
    posts: [{ id: 0, value: "", likes: 0, owner: "" }],
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
      var arr = [];
      const { contract } = this.state;
      const count = await contract.retrieve(this.state.accounts[0]);
      for (var i = 0; i < count; i++) {
        const response = await contract.retrieve1(i, this.state.accounts[0]);
        var id = response.post_id;
        var value = response.value;
        var owner = response.owner;
        var likes = response.likes;
        var newVal = { id, value, likes, owner };
        arr.push(newVal);
        //oldValue.push(response.value);
        //console.log(response);
      }
      this.state.posts = arr;
      console.log(this.state.posts);
      //var newValue = [];
      // for (var j = count - 1; j >= 0; j--) {
      //   newValue[j] = oldValue[count - j - 1];
      // }
      // this.setState({ storageValue: newValue });
    }
  }
  handleChange(event) {
    this.setState({ newValue: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { accounts, contract } = this.state;
    await contract.createpost(this.state.newValue, {
      from: accounts[0],
    });
    console.log(accounts[0]);
    this.display();
    // const response = await contract.retrieveall();
    // this.setState({ storageValue: response });
    this.setState({ newValue: "" });
    //console.log(this.state.storageValue);
  }
  // runExample = async () => {
  //   const { contract } = this.state;
  //   const response = await contract.read(accounts[0]);
  //   this.setState({ storageValue: response });
  // };
  render() {
    if (!this.state.web3) {
      return <div>Loading...</div>;
    }
    return (
      <div className="Posts">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newValue}
            onChange={this.handleChange}
            // .bind(this)
          />
          <input type="submit" value="Submit" />
        </form>
        <div>
          <h1>Posts</h1>
          {/* {Array.isArray(this.state.posts) && */}
          {this.state.posts.map((p, index) => (
            <div className="Post" key={index}>
              {p.owner}
              <hr />
              {p.value}
              <hr />
              <button>Like </button>
              {p.likes}
              {/* <hr /> */}
            </div>
          ))}
          {/* {this.state.storageValue} */}
        </div>
      </div>
    );
  }
}

export default Post;
