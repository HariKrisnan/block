// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
contract SimpleStorage {
  // struct Post{
  //   string value;
  //   address owner;
  // }

  // Post[] posts;

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
  mapping(address => uint ) counts;
  mapping(address => mapping(uint => string)) posts;

    function createpost(string memory _content) public {
      uint256 a= counts[msg.sender];
        posts[msg.sender][a] = _content;
        counts[msg.sender]++;
    }

      function editpost(uint a,string memory _content) public {
    
        posts[msg.sender][a] = _content;
      
    }

    function retrieve() public view returns (uint256){
        return counts[msg.sender];
    }

    function retrieve1(uint256 a) public view returns (string memory){
        return posts[msg.sender][a];
    }

    function retrieveall() public view returns(string[] memory){
      string[] memory all;
      for(uint i=0; i<counts[msg.sender]; i++){
          all[i]=posts[msg.sender][i];
      }
      return all;
    }
}
