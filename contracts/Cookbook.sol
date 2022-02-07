// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Cookbook {
    // The cookbook is a list of recipes that users have decided to share.
    // Each recipe is a map of ingredients and methods.
    // Users can tip each other for the recipe. 
    uint256 totalRecipes;
    uint256 totalTips;
    bool public locked;

    event NewRecipe(address indexed from, uint256 timestamp, string recipeId);

    event RecipeTip(address indexed from, uint256 timestamp, string recipeId, uint256 amount);

    struct Recipe {
        address owner;
        string recipeId;
        string[] comments;
        uint256 timestamp;
        uint256 tips;
    }

    Recipe[] recipes;

    constructor () payable {
        console.log("Cookbook constructor");
    }

    modifier noReentrancy() {
        require(!locked, "No reentrancy");

        locked = true;
        _;
        locked = false;
    }

    // Add a new recipe to the cookbook.
    function addRecipe(string memory _recipeId) public noReentrancy {
        totalRecipes++;
        console.log("Recipe added w/ recipeID: %s, by %s:", _recipeId, msg.sender);

        // Store recipe data in an array
        Recipe memory recipe;
        recipe.owner = msg.sender;
        recipe.recipeId = _recipeId;
        recipe.timestamp = block.timestamp;
        recipe.tips = 0;
        recipes.push(recipe);

        // Emit event
        emit NewRecipe(msg.sender, block.timestamp, _recipeId);
    }

    // User can tip the owner of a recipe directly. The tip is recorded in the recipe's tips.
    function sendTip(address payable _owner, 
        string memory _recipeId, 
        uint256 _amount, 
        string memory _comment) public noReentrancy {
        // Check if the user is the owner of the recipe
        for (uint256 i=0; i<totalRecipes; i++) {
            if (keccak256(bytes(recipes[i].recipeId)) == keccak256(bytes(_recipeId))) {
                // If the sender is the owner of the recipe, exit. If not, transfer the amount to the owner.
                if (recipes[i].owner == msg.sender) {
                    console.log("User %s is the owner of recipe %s, cannot tip.", msg.sender, _recipeId);
                    break;
                } else {
                    // Record the tip and add comments if any
                    totalTips+=_amount;
                    recipes[i].tips += _amount;
                    recipes[i].comments.push(_comment);
                    // Send the tip from the sender to the recipe owner
                    require(
                    _amount <= address(msg.sender).balance,
                    "Trying to send more money than the address holds."
                    );
                    (bool success, ) = (_owner).call{value: _amount}("");
                    require(success, "Failed to send money to the owner.");
                    // Emit the event
                    emit RecipeTip(msg.sender, block.timestamp, _recipeId, _amount);
                    break;
                }
            }
        }
    }

    function getAllRecipes() public view returns (Recipe[] memory) {
        return recipes;
    }

    function getTotalRecipes() public view returns (uint256) {
        console.log("Total recipes for %s: %s", msg.sender, totalRecipes);
        return totalRecipes;
    }
}