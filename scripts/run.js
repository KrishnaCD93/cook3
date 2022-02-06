const main = async () => {
  const recipeContractFactory = await hre.ethers.getContractFactory("CookbookNFT");
  const recipeContract = await recipeContractFactory.deploy(
    ["Recipe1","Recipe2"], // name
    ["Recipe description", "desc2"], // description
    ["recipe png", "png2"], // image
    ["Recipe ID", "ID2"], // id
    [100, 100], // protein
    [100, 100], // carbs
    [100, 100], // fat
    [100, 100] // calories
  );
  await recipeContract.deployed();
  console.log("Recipe contract deployed to:", recipeContract.address);

  let txn;
  txn = await recipeContract.mintRecipeNFT(1);
  await txn.wait();

  let returnedTokenUri = await recipeContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
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