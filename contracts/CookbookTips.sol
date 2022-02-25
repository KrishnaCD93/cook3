// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/ArrayUtils.sol";
import "./Cookbook.sol";

// contract CookbookTips is Cookbook {
//     /* Users can send likes and tip each other for the recipe. */
//     uint256 totalTips;

//     // Create a mapping of like sender to the recipe they like.
//     mapping(address => uint256[][]) public myCookbookLikes;
//     mapping(address => uint256[][]) public myRecipeLikes;
//     event CookbookTip(address indexed from, uint256 timestamp, uint256 recipeToken, uint256 amount);

//     // User can send a like along with tokens for a cookbook or the recipe.
//     function likeCookbook(address payable _owner, 
//         uint256 _cookbookTokenNum, 
//         uint256 _amount) public {
//             if (!cookbookExists(_owner, _cookbookTokenNum)) revert();

//             uint256 cookbookIndex = _cookbookTokenNum - 1;

//             // Record the tip amount and add a like to the recipe.
//             _cookbookLikes[userProfile[_owner].listPointer][cookbookIndex].increment();
//             userProfile[_owner].myCookbooks[cookbookIndex].likes = _cookbookLikes[userProfile[_owner].listPointer][cookbookIndex].current();
//             // Record sender's like in myLikes mapping.
//             uint256 likeIndex = myCookbookLikes[msg.sender].length - 1;
//             myCookbookLikes[msg.sender][likeIndex] = [userProfile[_owner].listPointer, _cookbookTokenNum, _amount];

//             // Send tokens, if any, to the recipe owner.
//             if (_amount != 0) {
//             // Check if the the sender can afford the tip.
//             require(msg.sender != _owner, "You cannot tip yourself.");
//             require(
//             _amount <= address(msg.sender).balance,
//             "Trying to send more money than the address holds."
//             );
//             // Send the tokens and record the transfer amount.
//             (bool success, ) = (_owner).call{value: _amount}("");
//             require(success, "Failed to send money to the owner.");
//             totalTips += _amount;
//             userProfile[_owner].myCookbooks[cookbookIndex].tips += _amount;
//             }
    
//            // Emit the event
//           emit CookbookTip(msg.sender, block.timestamp, _cookbookTokenNum, _amount);
//       }

//     // User can like a recipe.
//     function likeRecipe(address _owner, 
//         uint256 _recipeTokenNum, uint256 _cookbookTokenNum) public returns (bool success) {
//             if (!recipeExists(_owner, _cookbookTokenNum, _recipeTokenNum)) revert();

//             // Record the like and tip amount.
//             uint256 recipeIndex = _recipeTokenNum - 1;
//             uint256 cookbookIndex = _cookbookTokenNum - 1;
//             _recipeLikes[userProfile[_owner].listPointer][cookbookIndex][recipeIndex].increment();
//             userProfile[_owner].myCookbooks[cookbookIndex].recipes[recipeIndex].likes = _recipeLikes[userProfile[_owner].listPointer][cookbookIndex][recipeIndex].current();

//             // Record record owner's likes.
//             uint256 likeIndex = myRecipeLikes[msg.sender].length - 1;
//             myRecipeLikes[msg.sender][likeIndex] = [userProfile[_owner].listPointer, _cookbookTokenNum, _recipeTokenNum];

//             return true;
//         }

//     // Get myCookbookLikes.
//     function getMyCookbookLikes(address _owner) public view returns (uint256[][] memory) {
//         uint256[][] memory _myCookbookLikes;
//         for (uint256 i = 0; i < myCookbookLikes[_owner].length; i++) {
//             for (uint256 j = 0; j < myCookbookLikes[_owner][i].length; j++) {
//                 _myCookbookLikes[i][j] = myCookbookLikes[_owner][i][j];
//             }
//         }
//         return _myCookbookLikes;  
//     }

//     // Get myRecipeLikes.
//     function getMyRecipeLikes(address _owner) public view returns (uint256[][] memory) {
//         uint256[][] memory _myRecipeLikes;
//         for (uint256 i = 0; i < myRecipeLikes[_owner].length; i++) {
//             for (uint256 j = 0; j < myRecipeLikes[_owner][i].length; j++) {
//                 _myRecipeLikes[i][j] = myRecipeLikes[_owner][i][j];
//             }
//         }
//         return _myRecipeLikes;  
//     }
// } 