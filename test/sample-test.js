const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Cookbook', async function () {
  it('Should add a new user', async function () {
    const Cookbook = await ethers.getContractFactory('Cookbook')
    const cookbook = await Cookbook.deploy()
    await cookbook.deployed()
    await cookbook.addUser('Krishna', 'test profile', 'test@test.com', ['tag1', 'tag2'])
    
    const userProfile = await cookbook.getAllOwners()
    const user = await cookbook.getUserProfile(userProfile[0])
    expect(user.name).to.equal('Krishna')
  })

  it('Should update my user profile', async function () {
    const Cookbook = await ethers.getContractFactory('Cookbook')
    const cookbook = await Cookbook.deploy()
    await cookbook.deployed()
    await cookbook.addUser('Krishna', 'test profile', 'test@test.com', ['tag1', 'tag2'])
    await cookbook.updateUser('Krishna', 'test profile update', 'test@test.com', ['tag1', 'tag2'])

    const userProfile = await cookbook.getUserProfile(msg.sender)
    expect(userProfile[0].description).to.equal('test profile update')
  })

  it('Should add a new cookbook to user profile', async function () {
    const Cookbook = await ethers.getContractFactory('Cookbook')
    const cookbook = await Cookbook.deploy()
    await cookbook.deployed()
    await cookbook.addCookbook('cookbook 1', 'test cookbook', ['tag1', 'tag2'])

    const myCookbooks = await cookbook.getMyCookbooks(msg.sender)
    expect(myCookbooks[0].name).to.equal('cookbook 1')
  })

  it('Should update my cookbook', async function () {
    const Cookbook = await ethers.getContractFactory('Cookbook')
    const cookbook = await Cookbook.deploy()
    await cookbook.deployed()
    const cookbookToken = await cookbook.getMyCookbooks(msg.sender)[0].cookbookToken
    await cookbook.updateCookbook('cookbook 1', 'test cookbook update', ['tag1', 'tag2'], cookbookToken)

    const myCookbooks = await cookbook.getMyCookbooks(msg.sender)
    expect(myCookbooks[0].description).to.equal('test cookbook update')
  })

  it('Should add a new recipe to cookbook', async function () {
    const Cookbook = await ethers.getContractFactory('Cookbook')
    const cookbook = await Cookbook.deploy()
    await cookbook.deployed()
    await cookbook.addRecipe('recipe 1', 'test recipe', 1)

    const myRecipes = await cookbook.getMyRecipes(msg.sender)
    expect(myRecipes[0].name).to.equal('recipe 1')
  })

  it('Should update my recipe', async function () {
    const Cookbook = await ethers.getContractFactory('Cookbook')
    const cookbook = await Cookbook.deploy()
    await cookbook.deployed()
    const cookbookToken = await cookbook.getMyCookbooks(msg.sender)[0].cookbookToken
    const recipeToken = await cookbook.getMyRecipes(msg.sender, cookbookToken)[0].recipeToken
    await cookbook.updateRecipe('recipe 1', 'test recipe update', cookbookToken)

    const myRecipes = await cookbook.getMyRecipes(msg.sender, cookbookToken)
    expect(myRecipes[0].description).to.equal('test recipe update')
  })

  // it('Should send a like to the cookbook', async function () {
  //   const Cookbook = await ethers.getContractFactory('Cookbook')
  //   const cookbook = await Cookbook.deploy()
  //   await cookbook.deployed()
  //   const cookbookToken = await cookbook.getMyCookbooks(msg.sender)[0].cookbookToken
  //   const amount = 0
  //   await cookbook.likeCookbook(msg.sender, cookbookToken, amount)

  //   const myCookbooks = await cookbook.getMyCookbooks(msg.sender)
  //   expect(myCookbooks[0].likes).to.equal(1)
  // })

  // it('Should send a like to the recipe', async function () {
  //   const Cookbook = await ethers.getContractFactory('Cookbook')
  //   const cookbook = await Cookbook.deploy()
  //   await cookbook.deployed()
  //   const cookbookToken = await cookbook.getMyCookbooks(msg.sender)[0].cookbookToken
  //   const recipeToken = await cookbook.getMyRecipes(msg.sender, cookbookToken)[0].recipeToken
  //   await cookbook.likeRecipe(msg.sender, cookbookToken, recipeToken)

  //   const myRecipes = await cookbook.getMyRecipes(msg.sender, cookbookToken)
  //   expect(myRecipes[0].likes).to.equal(1)
  // })
})