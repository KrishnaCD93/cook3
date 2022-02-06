// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Cookbook {
    // The cookbook is a list of recipes that users have decided to share.
    // Each recipe is a map of ingredients and methods.
    // Users can tip each other for the recipe. 
    uint256 totalRecipes;

    event NewRecipe(address indexed from, uint256 timestamp, string name, string recipeId, string description,
        string image, string video, string instructions);

    struct Recipe {
        address owner;
        string recipeId;
        string name;
        string description;
        string imageUrl;
        string videoUrl;
        string instructions;
        uint256 timestamp;
        uint256 tips;
        uint256 totalTips;
    }

    Recipe[] recipes;

    constructor () {
        console.log("Cookbook constructor");
    }

    function addRecipe(string memory _name, string memory _recipeId, string memory _imageUrl,
    string memory _videoUrl, string memory _instructions, string memory _description) public {
        totalRecipes++;
        console.log("Recipe added: %s w/ recipeID: %s, by %s:", _name, _recipeId, msg.sender);

        // Store recipe data in an array
        recipes.push(Recipe(msg.sender, _name, _recipeId, _imageUrl, _videoUrl, 
        _instructions, _description, block.timestamp, 0, 0));

        // Emit event
        emit NewRecipe(msg.sender, block.timestamp, _name, _recipeId, _imageUrl, _videoUrl, 
        _instructions, _description);
    }

    function getAllRecipes() public view returns (Recipe[] memory) {
        return recipes;
    }

    function getTotalRecipes() public view returns (uint256) {
        console.log("Total recipes for %s: %s", msg.sender, totalRecipes);
        return totalRecipes;
    }
}