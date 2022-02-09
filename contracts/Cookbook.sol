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

    // Create a mapping of owner to their cookbook and it's recipes.
    mapping(address => MyCookbook) public myCookbook;
    address[] public cookbookOwners;

    struct MyCookbook {
        string name;
        string description;
        Recipe[] recipes;
        uint listPointer;
    }

    struct Recipe {
        string recipeId;
        string[] comments;
        uint256 likes;
        uint256 timestamp;
        uint256 tips;
    }

    constructor () payable {
        console.log("Cookbook constructor");
    }

    // Check if cookbook exists.
    function cookbookExists(address _owner) public view returns (bool exists) {
        if (cookbookOwners.length == 0) return false;
        return cookbookOwners[myCookbook[_owner].listPointer] == _owner;
    }

    // Get count of cookbooks.
    function getCookbookCount() public view returns (uint256) {
        return cookbookOwners.length;
    }

    // Add a new cookbook.
    function addCookbook(address _owner, string memory _name, string memory _description) public returns (bool success) {
        if (cookbookExists(_owner)) revert("Cookbook already exists");
        cookbookOwners.push(_owner);
        myCookbook[_owner].name = _name;
        myCookbook[_owner].description = _description;
        myCookbook[_owner].listPointer = cookbookOwners.length - 1;
        return true;
    }

    // Update a cookbook.
    function updateCookbook(address _owner, string memory _name, string memory _description) public returns (bool success) {
        if (!cookbookExists(_owner)) revert("Cookbook does not exist");
        myCookbook[_owner].name = _name;
        myCookbook[_owner].description = _description;
        return true;
    }

    // Delete a cookbook.
    function deleteCookbook(address _owner) public returns (bool success) {
        if (!cookbookExists(_owner)) revert();
        // Find index in cookbookOwners.
        uint256 index = myCookbook[_owner].listPointer;
        // Remove from cookbookOwners.
        cookbookOwners[index] = cookbookOwners[cookbookOwners.length - 1];
        cookbookOwners.pop();
        delete myCookbook[_owner];
        return true;
    }

    // Add a new recipe to the cookbook.
    function addRecipe(string memory _recipeId) public {
        totalRecipes++;

        // Store recipe data in myCookbook.
        Recipe memory recipe;
        recipe.recipeId = _recipeId;
        recipe.timestamp = block.timestamp;
        myCookbook[msg.sender].recipes.push(recipe);

        console.log("Recipe added w/ recipeID: %s, by %s:", _recipeId, msg.sender);
        // Emit event
        emit NewRecipe(msg.sender, block.timestamp, _recipeId);
    }

    // Update a recipe with comments.
    function updateRecipe(address _owner, string memory _recipeId, string memory _comment) public returns (bool success) {
        // Find recipe in myCookbook.
        uint256 index = 0;
        for (uint256 i = 0; i < myCookbook[_owner].recipes.length; i++) {
            if (keccak256(bytes(myCookbook[_owner].recipes[i].recipeId)) == keccak256(bytes(_recipeId))) {
                index = i;
                break;
            }
        }
        // Add comments.
        myCookbook[_owner].recipes[index].comments.push(_comment);

        console.log("Recipe w/ recipeID: %s, updated by %s:", _recipeId, msg.sender);
        return true;
    }

    // Delete a recipe.
    function deleteRecipe(address _owner, string memory _recipeId) public returns (bool success) {
        // Find recipe in myCookbook.
        uint256 index = 0;
        for (uint256 i = 0; i < myCookbook[_owner].recipes.length; i++) {
            if (keccak256(bytes(myCookbook[_owner].recipes[i].recipeId)) == keccak256(bytes(_recipeId))) {
                index = i;
                break;
            }
        }
        // Delete recipe.
        delete myCookbook[_owner].recipes[index];

        console.log("Recipe w/ recipeID: %s, deleted by %s:", _recipeId, msg.sender);
        return true;
    }

    // User can tip the owner of a recipe directly. The tip is recorded in the recipe's tips.
    function sendTip(address payable _owner, 
        uint256 _index,
        string memory _recipeId, 
        uint256 _amount) public {
            if (!cookbookExists(_owner)) revert();
            // Check if the the sender can afford the tip.
            require(
            _amount <= address(msg.sender).balance,
            "Trying to send more money than the address holds."
            );
            // Send the tip from the sender to the recipe owner
            (bool success, ) = (_owner).call{value: _amount}("");
            require(success, "Failed to send money to the owner.");
            // Record the tip amount
            totalTips += _amount;
            myCookbook[_owner].recipes[_index].tips += _amount;
            // Emit the event
            emit RecipeTip(msg.sender, block.timestamp, _recipeId, _amount);
        }
    
    // TODO: Users can add comments and likes as signatures to a recipe or a cookbook.


    // Get all the recipes for a user.
    function getMyRecipes(address _owner) public view returns (Recipe[] memory) {
        if (!cookbookExists(_owner)) revert("Cookbook not populated, start by building a recipe.");
        return myCookbook[_owner].recipes;
    }

    // Get all the cookbook owners.
    function getAllCookbooks() public view returns (address[] memory) {
        return cookbookOwners;
    }

    function getTotals() public view returns (uint256 r, uint256 t) {
        console.log("Number of recipes on this site is: %", totalRecipes);
        console.log("Total of tips sent for the recipes is: %", totalTips);
        r = totalRecipes;
        t = totalTips;
    }
}