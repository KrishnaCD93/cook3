import fleek from '@fleekhq/fleek-storage-js'

const fleekStorageKey = process.env.REACT_APP_FLEEK_STORAGE_KEY
const fleekStorageSecret = process.env.REACT_APP_FLEEK_STORAGE_SECRET

const useFleekStorage = () => {
  async function fleekStorageGet(key, bucket) {
    const myRecipe = await fleek.get({
      apiKey: fleekStorageKey,
      apiSecret: fleekStorageSecret,
      key: key,
      bucket: bucket,
      getOptions: [
        'data',
        'hash',
        'publicUrl'
      ],
    })
    return myRecipe
  }

  // Upload recipe to Fleek Storage in the user's bucket
  async function fleekStorageUploadRecipeData(recipe){
    let date = new Date()
    let timestamp = date.getTime()
    let data = JSON.stringify(recipe)
    let input = {
      apiKey: fleekStorageKey,
      apiSecret: fleekStorageSecret,
      key: `${recipe.userId}/${recipe.cookbookId}/${recipe.name}/recipe-${timestamp}`,
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
  async function fleekStorageUploadRecipeImages(imageInfo, name, userId, cookbookId){
    let promises = []
    for (let i = 0; i < imageInfo.length; i++) {
      let data = imageInfo[i].image
      let input = {
        apiKey: fleekStorageKey,
        apiSecret: fleekStorageSecret,
        key: `${userId}/${cookbookId}/${name}/images/${imageInfo[i].type}/${imageInfo[i].name}`,
        ContentType: imageInfo[i].image.type,
        data: data,
      }
      let upload = await fleek.upload(input)
      promises.push(upload)
    }
    return promises
  }

  return [fleekStorageGet, fleekStorageUploadRecipeData, fleekStorageUploadRecipeImages]
}

export default useFleekStorage