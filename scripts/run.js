const main = async () => {
  const recipeContractFactory = await hre.ethers.getContractFactory("Cookbook");
  const recipeContract = await recipeContractFactory.deploy();
  await recipeContract.deployed();
  console.log("Recipe contract deployed to:", recipeContract.address);
  const [owner, user1] = await hre.ethers.getSigners();

  // Add a user
  let txn;
  txn = await recipeContract.addUser('Krishna', 'test profile', 'test@test.com', ['tag1', 'tag2']);
  await txn.wait();
  let userAddress = await recipeContract.getAllOwners();
  console.log("user profile:", userAddress[0]);
  userProfile = await recipeContract.getUserProfile(userAddress[0]);
  console.log("user:", userProfile.name);

  // Add a cookbook
  txn = await recipeContract.addCookbook('Cookbook 1', 'test cookbook', ['tag1', 'tag2']);
  await txn.wait();
  let cookbookProfile = await recipeContract.getMyCookbooks(userAddress[0]);
  console.log("cookbook token num:", cookbookProfile.cookbookTokenNum);

  // Add a recipe
  let cookbookToken = cookbookProfile.cookbookTokenNum;
  txn = await recipeContract.addRecipe('Recipe 1', 'test recipe', cookbookToken[0]);
  await txn.wait();
  let recipeProfile = await recipeContract.getMyRecipes(userAddress[0], cookbookToken[0]);
  console.log("recipe profile:", recipeProfile[0].recipeTokenNum);

  // Update a recipe
  let recipeToken = recipeProfile[0].recipeTokenNum;
  txn = await recipeContract.updateRecipe('test update', cookbookToken[0], recipeToken);
  await txn.wait();
  recipeProfile = await recipeContract.getMyRecipes(userAddress[0], cookbookToken[0]);
  console.log("recipe profile:", recipeProfile[0].recipeTokenNum);

  // Delete a recipe
  txn = await recipeContract.deleteRecipe(cookbookToken[0], recipeToken);
  await txn.wait();
  recipeProfile = await recipeContract.getMyRecipes(userAddress[0], cookbookToken[0]);
  console.log("recipe profile:", recipeProfile);

  // Update a cookbook
  txn = await recipeContract.updateCookbook('Cookbook 1', 'test update', ['tag3', 'tag4'], cookbookToken[0]);
  await txn.wait();
  cookbookProfile = await recipeContract.getMyCookbooks(userAddress[0]);
  console.log("cookbook profile:", cookbookProfile);

  // Delete a cookbook
  txn = await recipeContract.deleteCookbook(cookbookToken[0]);
  await txn.wait();
  cookbookProfile = await recipeContract.getMyCookbooks(userAddress[0]);
  console.log("cookbook profile:", cookbookProfile);

  // Update a user
  txn = await recipeContract.updateUser('Krishna', 'test update', 'test@test.com', ['tag3', 'tag4'])
  await txn.wait();
  userProfile = await recipeContract.getUserProfile(userAddress[0]);
  console.log("user profile:", userProfile);

  // Delete a user
  txn = await recipeContract.deleteUser();
  await txn.wait();
  totals = await recipeContract.getTotals();
  console.log("totals:", totals);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();