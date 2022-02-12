// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Cookbook {
    // The cookbook is a list of recipes that users have decided to share.
    // Each recipe is a map of ingredients and methods.
    // Users can tip each other for the recipe. 
    uint256 totalRecipes;
    uint256 totalTips;

    event NewCookbook(address indexed from, uint256 timestamp);
    event UpdateCookbook(address indexed from, uint256 timestamp);
    event DeleteCookbook(address indexed from, uint256 timestamp);
    event NewRecipe(address indexed from, uint256 timestamp, string recipeId);
    event UpdateRecipe(address indexed from, uint256 timestamp, string recipeId);
    event DeleteRecipe(address indexed from, uint256 timestamp, string recipeId);
    event CookbookTip(address indexed from, uint256 timestamp, string recipeId, uint256 amount);

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
        string recipeData;
        uint256 likes;
        uint256 timeCreated;
        uint256 timeUpdated;
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
    function addCookbook(address _owner, string memory _name, string memory _description) public {
        if (cookbookExists(_owner)) revert("Cookbook already exists");
        cookbookOwners.push(_owner);
        myCookbook[_owner].name = _name;
        myCookbook[_owner].description = _description;
        myCookbook[_owner].listPointer = cookbookOwners.length - 1;
        emit NewCookbook(_owner, block.timestamp);
    }

    // Update a cookbook.
    function updateCookbook(address _owner, string memory _name, string memory _description) public {
        if (!cookbookExists(_owner)) revert("Cookbook does not exist");
        myCookbook[_owner].name = _name;
        myCookbook[_owner].description = _description;
        emit UpdateCookbook(_owner, block.timestamp);
    }

    // Delete a cookbook.
    function deleteCookbook(address _owner) public {
        if (!cookbookExists(_owner)) revert();
        // Find index in cookbookOwners.
        uint256 index = myCookbook[_owner].listPointer;
        // Remove from cookbookOwners.
        cookbookOwners[index] = cookbookOwners[cookbookOwners.length - 1];
        cookbookOwners.pop();
        delete myCookbook[_owner];
        emit DeleteCookbook(_owner, block.timestamp);
    }

    // Add a new recipe to the cookbook.
    function addRecipe(string memory _recipeId, string memory _recipeData) public {
        totalRecipes++;

        // Store recipe data in myCookbook.
        Recipe memory recipe;
        recipe.recipeId = _recipeId;
        recipe.recipeData = _recipeData;
        recipe.timeCreated = block.timestamp;
        myCookbook[msg.sender].recipes.push(recipe);

        console.log("Recipe added w/ recipeID: %s, by %s:", _recipeId, msg.sender);
        // Emit event
        emit NewRecipe(msg.sender, block.timestamp, _recipeId);
    }

    // Update a recipe with comments.
    function updateRecipe(address _owner, 
        uint256 _index, 
        string memory _recipeId, 
        string memory _recipeData) public {
        if (keccak256(bytes(myCookbook[_owner].recipes[_index].recipeId)) != keccak256(bytes(_recipeId)))
            revert("Recipe ID does not match");
            
        // Update recipe data.
        myCookbook[_owner].recipes[_index].recipeData = _recipeData;
        myCookbook[_owner].recipes[_index].timeUpdated = block.timestamp;

        console.log("Recipe w/ recipeID: %s, updated by %s:", _recipeId, msg.sender);
        emit UpdateRecipe(msg.sender, block.timestamp, _recipeId);
    }

    // Delete a recipe.
    function deleteRecipe(address _owner, string memory _recipeId) public {
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
        emit DeleteRecipe(msg.sender, block.timestamp, _recipeId);
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
            // Record the tip amount and add a like to the recipe.
            totalTips += _amount;
            myCookbook[_owner].recipes[_index].tips += _amount;
            myCookbook[_owner].recipes[_index].likes++;
            // Emit the event
            emit CookbookTip(msg.sender, block.timestamp, _recipeId, _amount);
        }

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