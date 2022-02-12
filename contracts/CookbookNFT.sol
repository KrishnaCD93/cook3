/* NOTE: This contract will be released once a community has been built. This is 
to help organically grow the community and allow curators time to create great recipes. */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./libraries/Base64.sol";

contract CookbookNFT is ERC721 {
    /* A smart contract that saves user's personal recipes on the blockchain as NFTs.
    Users will be required to purchase an NFT in order to view the recipe instructions 
    from other users' cookbooks. */

    // Struct for storing recipe data
    struct RecipeAttributes {
        uint recipeIndex;
        string name;
        string description;
        string image;
        string video;
        string instructions;
        string recipeId;
        string recipeData;
        uint protien;
        uint carbs;
        uint fat;
        uint calories;
    }

    // Counters for generating unique tokenIds
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Create array of recipes
    RecipeAttributes[] recipes;

    // Create a mapping from the nft's tokenId to that NFTs attributes
    mapping(uint256 => RecipeAttributes) public recipeNFTHolderAttributes;

    // NOTE?: Add a struct for user's personal data and goals?

    // Create a mapping from an address to the NFTs tokenId to store the owner for reference
    mapping(address => uint256) public recipeNFTHolders;

    constructor() ERC721("Recipes", "RECIPE") {}

    function createRecipe(string[] memory recipeName,
        string[] memory recipeDescription,
        string[] memory imageURI,
        string[] memory videoURI,
        string[] memory recipeId,
        string[] memory recipeData,
        uint[] memory protien,
        uint[] memory carbs,
        uint[] memory fat,
        uint[] memory calories) public {
        if (recipeName.length == 1) {
            recipes.push(RecipeAttributes({
              recipeIndex: 0,
              name: recipeName[0],
              description: recipeDescription[0],
              image: imageURI[0],
              video: videoURI[0],
              instructions: "",
              recipeId: recipeId[0],
              recipeData: recipeData[0],
              protien: protien[0],
              carbs: carbs[0],
              fat: fat[0],
              calories: calories[0]
            }));
          RecipeAttributes memory r = recipes[0];
          console.log("Done initializing recipe: %s, with recipeId: %s", r.name, r.recipeId);
        } else {
          for(uint i = 0; i < recipeName.length; i++) {
              recipes.push(RecipeAttributes({
                  recipeIndex: i,
                  name: recipeName[i],
                  description: recipeDescription[i],
                  image: imageURI[i],
                  video: videoURI[i],
                  instructions: "",
                  recipeId: recipeId[i],
                  recipeData: recipeData[i],
                  protien: protien[i],
                  carbs: carbs[i],
                  fat: fat[i],
                  calories: calories[i]
              }));
              RecipeAttributes memory r = recipes[i];
              console.log("Done initializing recipe: %s, with recipeId: %s", r.name, r.recipeId);
          }
        }

        // Increment _tokenId to start at 1
        _tokenIds.increment();
    }

    // Function to mint NFT based on recipeId
    function mintRecipeNFT(uint _recipeIndex) external {
        // Get current tokenId
        uint256 newItemId = _tokenIds.current();

        // Assign the tokenId to the caller's wallet address
        _safeMint(msg.sender, newItemId);

        // Map the tokenId to the recipe attributes
        recipeNFTHolderAttributes[newItemId] = RecipeAttributes({
            recipeIndex: _recipeIndex,
            name: recipes[_recipeIndex].name,
            description: recipes[_recipeIndex].description,
            image: recipes[_recipeIndex].image,
            video: recipes[_recipeIndex].video,
            instructions: "",
            recipeId: recipes[_recipeIndex].recipeId,
            recipeData: recipes[_recipeIndex].recipeData,
            protien: recipes[_recipeIndex].protien,
            carbs: recipes[_recipeIndex].carbs,
            fat: recipes[_recipeIndex].fat,
            calories: recipes[_recipeIndex].calories
        });

        console.log("Minted NFT w/ tokenId: %s and recipeIndex: %s", newItemId, _recipeIndex);

        // Track who owns which NFT
        recipeNFTHolders[msg.sender] = newItemId;

        // Increment tokenId
        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        RecipeAttributes memory recipeAttributes = recipeNFTHolderAttributes[_tokenId];

        string memory protien = Strings.toString(recipeAttributes.protien);
        string memory carbs = Strings.toString(recipeAttributes.carbs);
        string memory fat = Strings.toString(recipeAttributes.fat);
        string memory calories = Strings.toString(recipeAttributes.calories);

        string memory json = Base64.encode(
            abi.encodePacked(
              '{"name": "',
              recipeAttributes.name,
              ' -- NFT #: ',
              Strings.toString(_tokenId),
              '", "description": ',
              recipeAttributes.description,'", "image": "',
              recipeAttributes.image,'", "youtube_url": "', 
              recipeAttributes.video,
              '", "external_url": "', recipeAttributes.recipeData, 
              '", "attributes": [ { "trait_type": "Protien", "value": ',
              protien,'}, { "trait_type": "Carbs", "value": ',
              carbs,'}, { "trait_type": "Fat", "value": ',
              fat,'}, { "trait_type": "Calories", "value": ',
              calories,'} ]}'
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        
        return output;
    }
}