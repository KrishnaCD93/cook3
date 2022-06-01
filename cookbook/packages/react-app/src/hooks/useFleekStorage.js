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

  async function fleekStorageUpload(recipe){
    let date = new Date()
    let timestamp = date.getTime()
    let data = JSON.stringify(recipe)
    let input = {
      apiKey: fleekStorageKey,
      apiSecret: fleekStorageSecret,
      key: `${recipe.userID}/${recipe.cookbookID}/${recipe.recipeName}/${timestamp}`,
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

  return [fleekStorageGet, fleekStorageUpload]
}

export default useFleekStorage