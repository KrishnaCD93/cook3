import fleek from '@fleekhq/fleek-storage-js'

const fleekStorageKey = process.env.REACT_APP_FLEEK_STORAGE_KEY
const fleekStorageSecret = process.env.REACT_APP_FLEEK_STORAGE_SECRET

const useFleekStorage = () => {
  // List all files for the current user
  async function listFiles() {
    const input = {
      apiKey: fleekStorageKey,
      apiSecret: fleekStorageSecret,
      getOptions: [
        // 'data',
        'bucket',
        'key',
        'hash',
        'publicUrl'
      ],
    };
  
    const result = await fleek.listFiles(input);
    return result;
  };

  // Get all data for a user
  async function fleekStorageGet(key) {
    const myRecipe = await fleek.get({
      apiKey: fleekStorageKey,
      apiSecret: fleekStorageSecret,
      key: key,
      getOptions: [
        'key'
      ],
    })
    return myRecipe
  }

  // Get data from hash
  async function fleekStorageGetByHash(hash) {
    const input = { hash };
    const result = await fleek.getFileFromHash(input);
    return result
  }

  // Upload recipe to Fleek Storage in the user's bucket
  async function fleekStorageUploadRecipeData(recipe){
    let data = JSON.stringify(recipe)
    let input = {
      apiKey: fleekStorageKey,
      apiSecret: fleekStorageSecret,
      key: `${recipe.userId}/${recipe.cookbookId}/${recipe.name}/${recipe.name}`,
      ContentType: 'application/json',
      data: data,
    }
    try {
      const upload = await fleek.upload(input)
      return upload
    } catch (error) {
      console.log('error: ', error)
    }
  }

  // Upload images in the recipe to the fleek storage's recipe bucket
  async function fleekStorageUploadRecipeImages(imageInfo, recipeName, userId, cookbookId){
    let promises = []
    for (let i = 0; i < imageInfo.length; i++) {
      let data = imageInfo[i].image
      let input = {
        apiKey: fleekStorageKey,
        apiSecret: fleekStorageSecret,
        key: `${userId}/${cookbookId}/${recipeName}/images/${imageInfo[i].type}/${imageInfo[i].name}`,
        ContentType: imageInfo[i].image.type,
        data: data,
      }
      let upload = await fleek.upload(input)
      promises.push({ imageName: imageInfo[i].name, upload })
    }
    return promises
  }

  // Save recipe and image hashes to fleek storage under user profile
  async function fleekStorageSaveToProfile(recipeName, recipeHash, imageHashes, metaQualityTags, userId){
    let data = { recipeName, recipeHash, imageHashes, metaQualityTags }
    let uploadData = JSON.stringify(data)
    let input = {
      apiKey: fleekStorageKey,
      apiSecret: fleekStorageSecret,
      key: `${userId}/profile/${recipeName}`,
      ContentType: 'application/json',
      data: uploadData
    }
    const save = await fleek.upload(input)
    return save
  }

  return [listFiles, fleekStorageGet, fleekStorageGetByHash, fleekStorageUploadRecipeData, fleekStorageUploadRecipeImages, fleekStorageSaveToProfile]
}

export default useFleekStorage