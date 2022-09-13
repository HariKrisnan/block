// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
contract SimpleStorage {
  struct Post{
    uint post_id;
    string value;
    address owner;
    uint likes;
  }

  Post[] posts;
  uint count=0;

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

    function retrieve() public view returns (uint256){
      uint counter=0;
      for(uint i=0;i<count;i++){
        Post memory p= posts[i];
        if(p.owner==msg.sender){
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
    function retrieve1(uint256 a) public view returns (Post memory){
      uint counter=0;
      for(uint i=0;i<count;i++){
        Post memory p= posts[i];
        if(p.owner==msg.sender){
          if(counter==a){
            return p;
          }
          counter++;
        }
      }
    }
    // function retrieveall() public view returns(string[] memory){
    //   string[] memory all;
    //   for(uint i=0; i<counts[msg.sender]; i++){
    //       all[i]=posts[msg.sender][i];
    //   }
    //   return all;
    // }
}
