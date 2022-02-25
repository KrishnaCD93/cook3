// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/ArrayUtils.sol";

contract Cookbook {
    /* The cookbook is a list of recipes that users have decided to share.
    Each recipe is identified by it's unique token for each cookbook owner.*/

    using Counters for Counters.Counter;
    Counters.Counter public totalRecipeCount; // Total number of recipes in the network.
    Counters.Counter public totalCookbookCount; // Total number of cookbooks in the network.
    mapping(uint256 => Counters.Counter) private _cookbookToken; // Cookbook token number of current user.
    mapping(uint256 => mapping(uint256 => Counters.Counter)) private _recipeToken; // Recipe token number of current cookbook.

    // Events for creating, updating and deleting user profiles.
    event NewUser(address indexed user, uint256 timestamp);
    event UpdateUser(address indexed user, uint256 timestamp);
    event DeleteUser(address indexed user, uint256 timestamp);
    // Events for creating, updating and deleting cookbooks.
    event NewCookbook(address indexed from, uint256 timestamp, uint256 cookbookToken);
    event UpdateCookbook(address indexed from, uint256 timestamp, uint256 cookbookToken);
    event DeleteCookbook(address indexed from, uint256 timestamp, uint256 cookbookToken);
    // Events for creating, updating and deleting recipes.
    event NewRecipe(address indexed from, uint256 timestamp, uint256 recipeToken);
    event UpdateRecipe(address indexed from, uint256 timestamp, uint256 recipeToken);
    event DeleteRecipe(address indexed from, uint256 timestamp, uint256 recipeToken);

    // Create a mapping of owner to their profile and it's cookbooks and recipes.
    mapping(address => UserProfile) public userProfile;
    address[] public cookbookOwners;

    struct UserProfile {
        string name; // User's name
        string bio; // User's bio
        string email; // User's email
        string[] socials; // User's social media links
        mapping(uint256 => MyCookbook) myCookbooks; // User's cookbooks
        uint256 cookbookSize; // Number of cookbooks
        uint256 listPointer; // Pointer to the owner of the profile in cookbookOwners.
    }

    struct MyCookbook {
        string name; // The name of the cookbook.
        string description; // The description of the cookbook.
        string[] tags; // The tags of the cookbook.
        mapping(uint256 => Recipe) myRecipes; // The recipes in the cookbook.
        uint256 recipeSize; // The size of the recipes array.
        uint256 timeCreated; // The time the cookbook was created.
        uint256 cookbookTokenNum; // The cookbook token number.
        uint256 likes; // The total likes for the cookbook.
        uint256 tips; // The total tips for the cookbook.
    }

    struct Recipe {
        string recipeId; // Database ID to connect to the ingredients and methods.
        string recipeData; // The full recipe data encoded as a base64 string.
        uint256 timeCreated; // The time this recipe was created.
        uint256 timeUpdated; // The time this recipe was last updated.
        uint256 recipeTokenNum; // The recipe token number.
        uint256 likes; // The number of likes for this recipe.
    }

    constructor () payable {
        console.log("Cookbook constructor");
    }

    modifier originSender() {
        require(tx.origin == msg.sender);
        _;
    }

    // Check if user exists.
    function userExists(address user) public view returns (bool) {
        return user == cookbookOwners[userProfile[user].listPointer];
    }

    // Add a new user.
    function addUser(string memory _name, 
        string memory _bio, string memory _email, 
        string[] memory _socials) public originSender {
        address user = msg.sender;
        cookbookOwners.push(user); // Add user to the list of cookbook owners.

        // Create a new user profile.
        UserProfile storage newUser = userProfile[user];
        newUser.name = _name;
        newUser.bio = _bio;
        newUser.email = _email;
        newUser.socials = _socials;
        newUser.cookbookSize = 0;
        newUser.listPointer = cookbookOwners.length - 1;

        emit NewUser(user, block.timestamp);
    }

    // Update a user.
    function updateUser(string memory _name, string memory _bio, string memory _email, string[] memory _socials) public originSender {
        address user = msg.sender;
        if (!userExists(user)) revert();

        // Check which fields have changed and update.
        if (keccak256(bytes((_name))) != keccak256(bytes((userProfile[user].name)))) 
            userProfile[user].name = _name;
        if (keccak256(bytes((_bio))) != keccak256(bytes((userProfile[user].bio)))) 
            userProfile[user].bio = _bio;
        if (keccak256(bytes((_email))) != keccak256(bytes((userProfile[user].email)))) 
            userProfile[user].email = _email;
        for (uint256 i = 0; i < _socials.length; i++) {
            if (keccak256(bytes((_socials[i]))) != keccak256(bytes((userProfile[user].socials[i])))) 
                userProfile[user].socials[i] = _socials[i];
        }

        emit UpdateUser(user, block.timestamp);
    }

    // Delete a user.
    function deleteUser() public originSender {
        address user = msg.sender;
        if (!userExists(user)) revert();
        
        uint256 index = userProfile[user].listPointer; // Find index in cookbookOwners.
        require(index < cookbookOwners.length, "index out of bound"); 
        
        // Remove from cookbookOwners.
        for (uint i = index; i < cookbookOwners.length - 1; i++) {
            cookbookOwners[i] = cookbookOwners[i + 1];
        }
        cookbookOwners.pop();
        // Remove from mapping.
        delete userProfile[user];

        emit DeleteUser(user, block.timestamp);
    }

    // Check if cookbook exists.
    function cookbookExists(address _owner, uint256 _tokenNum) public view returns (bool exists) {
        if (!userExists(_owner)) revert();
        uint256 index = _tokenNum - 1;
        return _tokenNum == userProfile[_owner].myCookbooks[index].cookbookTokenNum;
    }

    // Add a new cookbook.
    function addCookbook(string memory _name, string memory _description, string[] memory _tags) public originSender {
        address owner = msg.sender;
        uint256 index = userProfile[owner].cookbookSize; // Get index in cookbook array.
        totalCookbookCount.increment(); // Increment total cookbook count.
        _cookbookToken[userProfile[owner].listPointer].increment(); // Increment cookbook token.

        // Create cookbook and map it to the owner.
        MyCookbook storage newCookbook = userProfile[owner].myCookbooks[index];
        newCookbook.name = _name;
        newCookbook.description = _description;
        newCookbook.tags = _tags;
        newCookbook.timeCreated = block.timestamp;
        newCookbook.cookbookTokenNum = _cookbookToken[userProfile[owner].listPointer].current();
        userProfile[owner].cookbookSize += 1; // Increment cookbook size.

        emit NewCookbook(owner, block.timestamp, userProfile[owner].cookbookSize);
    }

    // Update a cookbook.
    function updateCookbook(string memory _name, string memory _description, string[] memory _tags, uint256 _cookbookTokenNum) public originSender {
        address owner = msg.sender;
        uint256 index = _cookbookTokenNum - 1;
        if (!cookbookExists(owner, index)) revert();
        
        // Check which fields have changed and update.
        if (keccak256(bytes((_name))) != keccak256(bytes((userProfile[owner].myCookbooks[index].name)))) 
            userProfile[owner].myCookbooks[index].name = _name;
        if (keccak256(bytes((_description))) != keccak256(bytes((userProfile[owner].myCookbooks[index].description)))) 
            userProfile[owner].myCookbooks[index].description = _description;
        for (uint256 i = 0; i < _tags.length; i++) {
            if (keccak256(bytes((_tags[i]))) != keccak256(bytes((userProfile[owner].myCookbooks[index].tags[i])))) 
                userProfile[owner].myCookbooks[index].tags[i] = _tags[i];
        }

        emit UpdateCookbook(owner, block.timestamp, _cookbookTokenNum);
    }

    // Delete a cookbook.
    function deleteCookbook(uint256 _cookbookTokenNum) public originSender {
        address owner = msg.sender;
        uint256 index = _cookbookTokenNum - 1;

        require(index < userProfile[owner].cookbookSize, "index out of bound");
        if (!cookbookExists(owner, _cookbookTokenNum)) revert();

        delete userProfile[owner].myCookbooks[index]; // Delete cookbook from mapping.
        userProfile[owner].cookbookSize -= 1; // Decrement cookbook size.
        _cookbookToken[userProfile[owner].listPointer].decrement(); // Decrement cookbook token.
        totalCookbookCount.decrement(); // Decrement total cookbook count.

        emit DeleteCookbook(owner, block.timestamp, _cookbookTokenNum);
    }

    // Check if owner's recipe exists.
    function recipeExists(address _owner, uint256 _cookbookTokenNum, uint256 _recipeTokenNum) public view returns (bool exists) {
        uint256 cookbookIndex = _cookbookTokenNum - 1;
        if (!cookbookExists(_owner, _cookbookTokenNum)) return false;
        return userProfile[_owner].myCookbooks[cookbookIndex].recipeSize <= _recipeTokenNum;
    }

    // Add a new recipe to the cookbook.
    function addRecipe(string memory _recipeId, string memory _recipeData, uint256 _cookbookTokenNum) public originSender {
        address owner = msg.sender;
        uint256 cookbookIndex = _cookbookTokenNum - 1;
        uint256 recipeIndex = userProfile[owner].myCookbooks[cookbookIndex].recipeSize;
        if (!cookbookExists(owner, _cookbookTokenNum)) revert();
        totalRecipeCount.increment();
        _recipeToken[userProfile[owner].listPointer][cookbookIndex].increment();

        // Store recipe data in myCookbook.
        Recipe storage newRecipe = userProfile[owner].myCookbooks[cookbookIndex].myRecipes[recipeIndex];
        newRecipe.recipeId = _recipeId;
        newRecipe.recipeData = _recipeData;
        newRecipe.timeCreated = block.timestamp;
        newRecipe.recipeTokenNum = _recipeToken[userProfile[owner].listPointer][cookbookIndex].current();
        userProfile[owner].myCookbooks[cookbookIndex].recipeSize += 1; // Increment recipe size.

        // Emit event
        emit NewRecipe(msg.sender, block.timestamp, userProfile[owner].myCookbooks[cookbookIndex].recipeSize);
    }

    // Update a recipe.
    function updateRecipe(string memory _recipeData, uint256 _cookbookTokenNum, uint256 _recipeTokenNum) public originSender {
        address owner = msg.sender;
        if (!recipeExists(owner, _cookbookTokenNum, _recipeTokenNum)) revert();

        uint256 recipeIndex = _recipeTokenNum - 1;
        uint256 cookbookIndex = _cookbookTokenNum - 1;
        // Update recipe data.
        userProfile[owner].myCookbooks[cookbookIndex].myRecipes[recipeIndex].recipeData = _recipeData;
        userProfile[owner].myCookbooks[cookbookIndex].myRecipes[recipeIndex].timeUpdated = block.timestamp;

        emit UpdateRecipe(owner, block.timestamp, _recipeTokenNum);
    }

    // Delete a recipe.
    function deleteRecipe(uint256 _cookbookTokenNum, uint256 _recipeTokenNum) public originSender {
        address _owner = msg.sender;
        if (!recipeExists(_owner, _cookbookTokenNum, _recipeTokenNum)) revert();

        uint256 recipeIndex = _recipeTokenNum - 1;
        uint256 cookbookIndex = _cookbookTokenNum - 1;
        delete userProfile[_owner].myCookbooks[cookbookIndex].myRecipes[recipeIndex]; // Delete recipe from mapping.
        userProfile[_owner].myCookbooks[cookbookIndex].recipeSize -= 1; // Decrement recipe size.
        _recipeToken[userProfile[_owner].listPointer][cookbookIndex].decrement(); // Decrement recipe token.
        totalRecipeCount.decrement(); // Decrement total recipe count.

        emit DeleteRecipe(_owner, block.timestamp, _recipeTokenNum);
    }


    // Get all the cookbook owners.
    function getAllOwners() public view returns (address[] memory) {
        return cookbookOwners;
    }

    // Get user profile info.
    function getUserProfile(address _owner) public view returns (string memory name, string memory bio, 
        string memory email, string[] memory socials, uint cookbookSize, uint listPointer) {
        return (userProfile[_owner].name, userProfile[_owner].bio, userProfile[_owner].email, 
        userProfile[_owner].socials, userProfile[_owner].cookbookSize, userProfile[_owner].listPointer);
    }

    // Get all cookbooks.
    function getMyCookbooks(address _owner) public view returns (string[] memory name, string[] memory description, 
        string[][] memory tags, uint256[] memory numRecipes, uint256[] memory cookbookTokenNum) {
        if (!userExists(_owner)) revert("User does not exist");

        // Get cookbook info.
        string[] memory cookbookNames = new string[](userProfile[_owner].cookbookSize);
        string[] memory cookbookDescriptions = new string[](userProfile[_owner].cookbookSize);
        string[][] memory cookbookTags = new string[][](userProfile[_owner].cookbookSize);
        uint256[] memory cookbookRecipeSizes = new uint256[](userProfile[_owner].cookbookSize);
        uint256[] memory cookbookTokenNums = new uint256[](userProfile[_owner].cookbookSize);
        
        // Store info in an array.
        for (uint i = 0; i < userProfile[_owner].cookbookSize; i++) {
            cookbookNames[i] = userProfile[_owner].myCookbooks[i].name;
            cookbookDescriptions[i] = userProfile[_owner].myCookbooks[i].description;
            cookbookRecipeSizes[i] = userProfile[_owner].myCookbooks[i].recipeSize;
            cookbookTags[i] = new string[](userProfile[_owner].myCookbooks[i].tags.length);
            for (uint j = 0; j < userProfile[_owner].myCookbooks[i].tags.length; j++) {
                cookbookTags[i][j] = userProfile[_owner].myCookbooks[i].tags[j];
            }
            cookbookTokenNums[i] = userProfile[_owner].myCookbooks[i].cookbookTokenNum;
        }

        return (cookbookNames, cookbookDescriptions, cookbookTags, cookbookRecipeSizes, cookbookTokenNums);
    }

    // Get all the recipes for a cookbook.
    function getMyRecipes(address _owner, uint256 _cookbookTokenNum) public view returns (Recipe[] memory) {
        if (!cookbookExists(_owner, _cookbookTokenNum)) revert();
        uint256 cookbookIndex = _cookbookTokenNum - 1;
        Recipe[] memory myRecipes = new Recipe[](userProfile[_owner].myCookbooks[cookbookIndex].recipeSize);
        for (uint i = 0; i < userProfile[_owner].myCookbooks[cookbookIndex].recipeSize; i++) {
            myRecipes[i] = userProfile[_owner].myCookbooks[cookbookIndex].myRecipes[i];
        }
        return myRecipes;
    }


    function getTotals() public view returns (uint256 totalUsers, uint256 totalCookbooks, uint256 totalRecipes) {
        uint256 recipeTotal = totalRecipeCount.current();
        uint256 cookbookTotal = totalCookbookCount.current();
        uint256 userTotal = cookbookOwners.length;
        return(userTotal, cookbookTotal, recipeTotal);
    }
}