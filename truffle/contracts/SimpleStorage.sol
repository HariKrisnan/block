// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
contract SimpleStorage {
  struct Post{
    string value;
    address owner;
  }

  Post[] posts;

  function read(address own) public view returns (Post[] memory) {
    Post[] memory repost;
    uint j=0;
    for(uint i=0; i<posts.length;i++){
        if(posts[i].owner==own){
            repost[j]=posts[i];
            j++;
        }
    }
    return repost;
  }

  function write(string memory val, address own) public {
    Post memory newPost;
    newPost.value=val;
    newPost.owner=own;
    posts.push(newPost);
  }
}
