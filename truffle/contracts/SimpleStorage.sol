// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
contract SimpleStorage {
  struct Post{
    uint post_id;
    string value;
    address owner;
    uint likes;
  }

  struct User{
    string name;
    // User[] followers;
    // User[] following;
  }

  Post[] posts;
  uint count=0;

  mapping(address=>User) accounts;
  address[] addresses;

  function setName() public{
  User memory user1 = User("Abc");
  accounts[0x4ebC9c14FbA8D359D78BeAa916Ab062e1e058A4f] = user1;
  addresses.push(0x4ebC9c14FbA8D359D78BeAa916Ab062e1e058A4f);
  }

  function giveName(address a) public view returns (string memory){
    return accounts[a].name;
  }
  // function read(address own) public view returns (Post[] memory) {
  //   Post[] memory repost;
  //   uint j=0;
  //   for(uint i=0; i<posts.length;i++){
  //       if(posts[i].owner==own){
  //           repost[j]=posts[i];
  //           j++;
  //       }
  //   }
  //   return repost;
  // }

  // function write(string memory val, address own) public {
  //   Post memory newPost;
  //   newPost.value=val;
  //   newPost.owner=own;
  //   posts.push(newPost);
  // }
  //mapping(address => uint ) counts;
  // mapping(address => mapping(uint => string)) posts;


    function createpost(string memory _content) public {
      Post memory p;
      p.post_id=count;
      count++;
      p.value=_content;
      p.owner=msg.sender;
      p.likes=0;
      posts.push(p);
    }

    // function editpost(uint a,string memory _content) public {
    
    //   posts[msg.sender][a] = _content;
      
    // }

    function retrieve(address a) public view returns (uint256){
      uint counter=0;
      for(uint i=0;i<count;i++){
        Post memory p= posts[i];
        if(p.owner==a){
          counter++;
        }
      }
      return counter;
    }

    // function retrieve1(uint256 a) public view returns (string memory){
    //   uint counter=0;
    //   for(uint i=0;i<count;i++){
    //     Post memory p= posts[i];
    //     if(p.owner==msg.sender){
    //       if(counter==a){
    //         return p.value;
    //       }
    //       counter++;
    //     }
    //   }
    // }
    function retrieve2() public view returns (uint256){
      return count;
    }
    function retrieve1(uint256 a, address add) public view returns (Post memory){
      uint counter=0;
      for(uint i=0;i<count;i++){
        Post memory p= posts[i];
        if(p.owner==add){
          if(counter==a){
            return p;
          }
          counter++;
        }
      }
    }
    function retrieve3(uint256 a) public view returns (Post memory){
        Post memory p= posts[a];
        return p;
    }
    // function retrieveall() public view returns(string[] memory){
    //   string[] memory all;
    //   for(uint i=0; i<counts[msg.sender]; i++){
    //       all[i]=posts[msg.sender][i];
    //   }
    //   return all;
    // }
}
