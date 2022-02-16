// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Cookbook {
    /* The cookbook is a list of recipes that users have decided to share.
    Each recipe is identified by it's unique token for each cookbook owner.
    Users can send likes and tip each other for the recipe. */
    uint256 totalTips;

    using Counters for Counters.Counter;
    Counters.Counter totalRecipeCount;
    Counters.Counter[] private _recipeToken;
    Counters.Counter[] private _cookbookLikes;

    event NewCookbook(address indexed from, uint256 timestamp);
    event UpdateCookbook(address indexed from, uint256 timestamp);
    event DeleteCookbook(address indexed from, uint256 timestamp);
    event NewRecipe(address indexed from, uint256 timestamp, uint256 recipeToken);
    event UpdateRecipe(address indexed from, uint256 timestamp, uint256 recipeToken);
    event DeleteRecipe(address indexed from, uint256 timestamp, uint256 recipeToken);
    event CookbookTip(address indexed from, uint256 timestamp, uint256 recipeToken, uint256 amount);

    // Create a mapping of owner to their cookbook and it's recipes.
    mapping(address => MyCookbook) public myCookbook;
    address[] public cookbookOwners;

    // Create a mapping of like sender to the recipe they like.
    mapping(address => string[]) public myLikes;

    struct MyCookbook {
        string name; // The name of the cookbook.
        string description; // The description of the cookbook.
        string[] tags; // The tags of the cookbook.
        Recipe[] recipes; // The recipes in the cookbook.
        uint256 timeCreated; // The time the cookbook was created.
        uint256 likes; // The total likes for the cookbook.
        uint256 tips; // The total tips for the cookbook.
        uint listPointer; // The pointer to the owner of the cookbook.
    }

    struct Recipe {
        string recipeId; // Database ID to connect to the ingredients and methods.
        string recipeData; // The full recipe data encoded as a base64 string.
        uint256 likes; // The number of likes for this recipe.
        uint256 timeCreated; // The time this recipe was created.
        uint256 timeUpdated; // The time this recipe was last updated.
        uint256 recipeToken; // The unique token for this recipe.
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
    function addCookbook(address _owner, string memory _name, string memory _description, string[] memory _tags) public {
        if (cookbookExists(_owner)) revert("Cookbook already exists");
        cookbookOwners.push(_owner);

        MyCookbook memory cookbook;
        cookbook.name = _name;
        cookbook.description = _description;
        cookbook.tags = _tags;
        cookbook.timeCreated = block.timestamp;
        cookbook.listPointer = cookbookOwners.length - 1;
        myCookbook[_owner] = cookbook;

        emit NewCookbook(_owner, block.timestamp);
    }

    // Update a cookbook.
    function updateCookbook(address _owner, string memory _name, string memory _description, string[] memory _tags) public {
        if (!cookbookExists(_owner)) revert("Cookbook does not exist");
        myCookbook[_owner].name = _name;
        myCookbook[_owner].description = _description;
        myCookbook[_owner].tags = _tags;
        emit UpdateCookbook(_owner, block.timestamp);
    }

    // Delete a cookbook.
    function deleteCookbook(address _owner) public {
        if (!cookbookExists(_owner)) revert("Cookbook does not exist");
        // Find index in cookbookOwners.
        uint256 index = myCookbook[_owner].listPointer;
        // Remove from cookbookOwners.
        cookbookOwners[index] = cookbookOwners[cookbookOwners.length - 1];
        cookbookOwners.pop();
        delete myCookbook[_owner];
        emit DeleteCookbook(_owner, block.timestamp);
    }

    // Check if owner's recipe exists.
    function recipeExists(address _owner, uint _tokenNum) public view returns (bool exists) {
        if (!cookbookExists(_owner)) return false;
        uint recipeIndex = _tokenNum - 1;
        return myCookbook[_owner].recipes[recipeIndex].recipeToken == _tokenNum;
    }

    // Get count of owner's recipes.
    function getRecipeCount(address _owner) public view returns (uint256) {
        if (!cookbookExists(_owner)) return 0;
        return myCookbook[_owner].recipes.length;
    }

    // Add a new recipe to the cookbook.
    function addRecipe(string memory _recipeId, string memory _recipeData) public {
        address _owner = msg.sender;
        if (!cookbookExists(_owner)) revert("Cookbook does not exist");
        
        totalRecipeCount.increment();
        _recipeToken[myCookbook[_owner].listPointer].increment();

        // Store recipe data in myCookbook.
        Recipe memory recipe;
        recipe.recipeId = _recipeId;
        recipe.recipeData = _recipeData;
        recipe.timeCreated = block.timestamp;
        recipe.recipeToken = _recipeToken[myCookbook[_owner].listPointer].current();
        myCookbook[msg.sender].recipes.push(recipe);

        // Emit event
        console.log("Recipe added w/ recipeID: %s, by %s:", _recipeId, msg.sender);
        emit NewRecipe(msg.sender, block.timestamp, recipe.recipeToken);
    }

    // Update a recipe with comments.
    function updateRecipe(address _owner, 
        uint256 _tokenNum, 
        string memory _recipeData) public {
        if (!cookbookExists(_owner)) revert("Cookbook does not exist");
        if (!recipeExists(_owner, _tokenNum)) revert("Recipe does not exist");

        // Update recipe data.
        uint256 recipeIndex = _tokenNum - 1;
        myCookbook[_owner].recipes[recipeIndex].recipeData = _recipeData;
        myCookbook[_owner].recipes[recipeIndex].timeUpdated = block.timestamp;

        console.log("Recipe #: %s, updated by %s:", _tokenNum, msg.sender);
        emit UpdateRecipe(msg.sender, block.timestamp, _tokenNum);
    }

    // Delete a recipe.
    function deleteRecipe(address _owner, uint256 _tokenNum) public {
        uint256 index = _tokenNum - 1;
        delete myCookbook[_owner].recipes[index];

        console.log("Recipe #: %s, deleted by %s:", _tokenNum, msg.sender);
        emit DeleteRecipe(msg.sender, block.timestamp, _tokenNum);
    }

    // User can send a like along with tokens for a cookbook or the recipe.
    function sendCookbookLike(address payable _owner, 
        uint256 _tokenNum, 
        uint256 _amount) public {
            if (!cookbookExists(_owner)) revert();
            if (!recipeExists(_owner, _tokenNum)) revert();

            // Record the tip amount and add a like to the recipe.
            _cookbookLikes[myCookbook[_owner].listPointer].increment();
            myCookbook[_owner].likes = _cookbookLikes[myCookbook[_owner].listPointer].current();
            // Record record owner's likes.
            uint256 index = _tokenNum - 1;
            myLikes[msg.sender].push(myCookbook[_owner].recipes[index].recipeId);

            // Send tokens, if any, to the recipe owner.
            if (_amount != 0) {
            // Check if the the sender can afford the tip.
            require(
            _amount <= address(msg.sender).balance,
            "Trying to send more money than the address holds."
            );
            // Send the tokens and record the transfer amount.
            (bool success, ) = (_owner).call{value: _amount}("");
            require(success, "Failed to send money to the owner.");
            totalTips += _amount;
            myCookbook[_owner].tips += _amount;
            }

            // Emit the event
            emit CookbookTip(msg.sender, block.timestamp, _tokenNum, _amount);
        }

    // User can like a recipe.
    function sendRecipeLike(address payable _owner, 
        uint256 _tokenNum) public returns (bool success) {
            if (!cookbookExists(_owner)) revert();
            if (!recipeExists(_owner, _tokenNum)) revert();

            // Record the like and tip amount.
            uint256 index = _tokenNum - 1;
            myCookbook[_owner].recipes[index].likes += 1;

            // Record record owner's likes.
            myLikes[msg.sender].push(myCookbook[_owner].recipes[index].recipeId);

            return true;
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
        uint totalRecipes = totalRecipeCount.current();
        r = totalRecipes;
        t = totalTips;
    }
}