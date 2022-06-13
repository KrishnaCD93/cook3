import { EditablePreview, useColorModeValue, IconButton, Input, useEditableControls, ButtonGroup, Editable, Tooltip, EditableInput, EditableTextarea, Heading, Container, CSSReset, Box, Text, Textarea, VStack, StackDivider, Wrap, WrapItem } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl, Button } from '@chakra-ui/react'
import React, { useState } from 'react';
import { Body } from "../../components";
import useFleekStorage from "../../hooks/useFleekStorage";
import { useAccount } from 'wagmi'

// Create recipe page with recipe name, description, ingredients, steps, metaquality tags, and recipe image
const CreateRecipe = () => {
  const [fleekStorageUploadRecipeData, fleekStorageUploadRecipeImages, fleekStorageSaveToProfile] = useFleekStorage();
  const { data: account } = useAccount();
  const [uploading, setUploading] = useState(false);
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (formData) => {
    try {
      if (!account) {
        alert('Please connect to Ethereum')
        return;
      } else {
        setUploading(true)
        console.log(formData)
        let userId = account.address
        let cookbookId = 0 // set cookbook id to 0 for now and let users create cookbooks in their profile page
        let name = formData.name
        let description = formData.description
        let equipment = formData.equipment
        let ingredients = []
        let steps = []
        let metaQualityTags = []
        let imageInfo = []
        if (formData.recipeImage[0]) {
          imageInfo.push({
            name: name,
            type: 'recipe',
            image: formData.recipeImage[0]
          })
        }
        formData.ingredients.forEach((ingredient) => {
          if (!ingredient.name) {
            return;
          }
          if (!ingredient.image[0]) {
            ingredients.push({
              name: ingredient.name,
              quantity: ingredient.quantity,
              ingredientMeta: ingredient.ingredientMeta,
              hasImage: false
            })
          } else if (ingredient.image[0]) {
            ingredients.push({
              name: ingredient.name,
              quantity: ingredient.quantity,
              ingredientMeta: ingredient.ingredientMeta,
              hasImage: true,
            })
            imageInfo.push({
              name: ingredient.name,
              type: 'ingredient',
              image: ingredient.image[0]
            })
          }
        })
        formData.steps.forEach((step, index) => {
          if (!step.action && !step.trigger) {
            return;
          }
          if (!step.actionImage[0] && !step.triggerImage[0]) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              stepMeta: step.stepMeta,
              hasActionImage: false,
              hasTriggerImage: false
            })
          } else if (step.actionImage[0] && step.triggerImage[0]) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              stepMeta: step.stepMeta,
              hasActionImage: true,
              hasTriggerImage: true
            })
            imageInfo.push({
              name: `step-${index + 1}-action`,
              type: 'action',
              image: step.actionImage[0]
            })
            imageInfo.push({
              name: `step-${index + 1}-trigger`,
              type: 'trigger',
              image: step.triggerImage[0]
            })
          } else if (step.actionImage[0] && !step.triggerImage[0]) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              stepMeta: step.stepMeta,
              hasActionImage: true,
              hasTriggerImage: false
            })
            imageInfo.push({
              name: `step-${index + 1}-action`,
              type: 'action',
              image: step.actionImage[0]
            })
          } else if (!step.actionImage[0] && step.triggerImage[0]) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              stepMeta: step.stepMeta,
              hasActionImage: false,
              hasTriggerImage: true
            })
            imageInfo.push({
              name: `step-${index + 1}-trigger`,
              type: 'trigger',
              image: step.triggerImage[0]
            })
          }
          formData.metaQualityTags.forEach((tag) => { metaQualityTags.push(tag) })
        })
        let recipe = { userId, cookbookId, name, description, ingredients, steps, metaQualityTags, equipment }
        console.log(recipe);
        let uploadRecipe = await fleekStorageUploadRecipeData(recipe);
        console.log('uploaded data: ', uploadRecipe);
        console.log(imageInfo)
        let uploadImages = await fleekStorageUploadRecipeImages(imageInfo, name, userId, cookbookId);
        console.log('uploaded images: ', uploadImages);
        let uploadedRecipeHash = uploadRecipe.hash
        let uploadedImageHashes = []
        uploadImages.forEach((image) => { uploadedImageHashes.push({ imageName: image.imageName, imageHash: image.hash }) })
        console.log('uploadedImageHashes: ', uploadedImageHashes)
        let saveToProfile = await fleekStorageSaveToProfile(name, uploadedRecipeHash, uploadedImageHashes, userId)
        console.log('save to profile: ', saveToProfile)
        setUploading(false);
        alert('Recipe created!')
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  if (isSubmitting) {
    console.log('Submitting...')
  }

  if (errors) {
    console.log('errors: ', errors)
  }

  return (
    <Body>
    <CSSReset />
    <Container w='100%' bg='brand.200' boxShadow={'inner'} centerContent>
      <Box margin={'30px'} boxShadow='dark-lg' bg='brand.100'>
        <VStack divider={<StackDivider borderColor='brand.200' />} spacing={4} color={'brand.400'} margin='25px'>
          <Heading>Create Recipe</Heading>
          <FormProvider {...{ handleSubmit, register, errors, isSubmitting }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors} as='fieldset' isDisabled={uploading}>
                <FormLabel htmlFor="name">
                  <GetRecipeName />
                </FormLabel>
                <FormLabel htmlFor="description">
                  <GetDescription />
                </FormLabel>
                <FormLabel htmlFor="ingredients">
                  <GetIngredients />
                </FormLabel>
                <FormLabel htmlFor="steps">
                  <GetSteps />
                </FormLabel>
                <FormLabel htmlFor="metaQualityTags">
                  <GetMetaQualityTags />
                </FormLabel>
                <FormLabel htmlFor="equipment">
                  <GetEquipment />
                </FormLabel>
              </FormControl>
              <Button mt={4}  bg='brand.500' color='brand.400' boxShadow={'dark-lg'} _hover={{ bg: 'brand.800'}}
              isLoading={isSubmitting} type='submit' w='100%'>
                Create
              </Button>
            </form>
          </FormProvider>
        </VStack>
      </Box>
    </Container>
    </Body>
  )
}

// Editable controls for recipe name and description
function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2} colorScheme='brand'>
        <IconButton bg='brand.400' color='brand.600' border='1px' borderColor={'brand.400'} boxShadow={'md'} _hover={{ bg: 'brand.200'}}
          icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton bg='brand.400' color='brand.600' border='1px' borderColor={'brand.400'} boxShadow={'md'} _hover={{ bg: 'brand.200'}}
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  }

// Function to get recipe name
function GetRecipeName() {
  const { register, errors } = useFormContext();
  return (
    <Container p={2} m={2} bg='brand.500' boxShadow={'dark-lg'} centerContent>
    <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Recipe Name</Text>
    <Editable
      placeholder="...name, eg. Omelette"
      isPreviewFocusable={true}
      selectAllOnFocus={false}>
      <Tooltip label="Give your recipe a name.">
        <EditablePreview
          py={2}
          px={2}
          _hover={{
            background: useColorModeValue("brand.400", "brand.600")
          }}
        />
      </Tooltip>
      <Input py={2} px={2} as={EditableInput} isInvalid={false}
      {...register('name', {required: 'Give your recipe a name'})} />
      <FormErrorMessage>
        {errors.name && errors.name.message}
      </FormErrorMessage>
      <EditableControls />
    </Editable>
    <Input placeholder="Recipe Media" type={'file'} {...register('recipeImage')} variant='flushed' isInvalid={false} />
    </Container>
  )
}

// Function to get the recipe description
function GetDescription() {
  const { register, errors } = useFormContext();
  return (
    <Container p={2} m={2} bg='brand.500' boxShadow={'dark-lg'} centerContent>
    <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Description</Text>
    <Editable
      placeholder="...description, eg. Indian style omelette stuffed with cheese and tomatoes"
      isPreviewFocusable={true}
      selectAllOnFocus={false}>
      <Tooltip label="Add a short description of the dish.">
        <EditablePreview
          py={2}
          px={2}
          _hover={{
            background: useColorModeValue("brand.400", "brand.600")
          }}
        />
      </Tooltip>
      <Input py={2} px={2} as={EditableTextarea} isInvalid={false}
        {...register('description')} />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      <EditableControls />
    </Editable>
    </Container>
  )
}

// Function to get the ingredients in the recipe
const GetIngredients = () => {
  const { register, errors } = useFormContext();
  const [numIngredients, setNumIngredients] = useState(1);

  // Function to get the name of the ingredient
  function GetName({ index }) {
    return (
      <>
      <Tooltip label="Name of the ingredient">
        <Input py={2} px={2} placeholder="...name, eg. eggs, large" variant={'flushed'} isInvalid={false}
        {...register(`ingredients[${index}].name`, {required: 'Give the ingredient a name'})} />
      </Tooltip>
      {errors.ingredients && errors.ingredients[index] && errors.ingredients[index].name && (
        <FormErrorMessage>
          {errors.ingredients[index].name && errors.ingredients[index].name.message}
        </FormErrorMessage>
      )}
      </>
    )
  }

  // Function to get the amount of ingredients
  function GetAmount({ index }) {
    return (
      <>
      <Tooltip label="Add the quantity of the ingredient">
        <Input py={2} px={2} placeholder="...amount, eg. 2" variant={'flushed'} isInvalid={false}
        {...register(`ingredients[${index}].quantity`, {required: 'Give the ingredient a quantity'})} />
      </Tooltip>
      {errors.ingredients && errors.ingredients[index] && errors.ingredients[index].quantity && (
        <FormErrorMessage>
          {errors.ingredients[index].quantity && errors.ingredients[index].quantity.message}
        </FormErrorMessage>
      )}
      </>
      )
  }

  // Function to get the ingredient's meta: the effect on the recipe's taste
  function GetIngredientMeta({ index }) {
    return (
      <Tooltip label="How does this ingredient affect the taste of the recipe?">
        <Textarea py={2} px={2} placeholder="...ingredient's meta, eg. I use brown eggs from free roam chickens" variant={'flushed'} isInvalid={false}
        {...register(`ingredients[${index}].ingredientMeta`)} />
      </Tooltip>
    )
  }

  // Function to get a picture of the ingredient
  function GetImage({ index }) {
    return (
      <Tooltip label="Add an image of the ingredient">
        <Input py={2} px={2} type='file' variant={'flushed'} isInvalid={false}
        {...register(`ingredients[${index}].image`)} />
      </Tooltip>
    )
  }

  return (
    <Container p={2} m={2} bg='brand.500' boxShadow={'dark-lg'} centerContent>
    <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Ingredients</Text>
    <Wrap bg='brand.400' boxShadow={'md'}>
      {Array.from({ length: numIngredients }, (_, index) => (
      <WrapItem key={index}>
        <VStack justifyContent="space-between" alignItems="center" mt={4} p={2} boxShadow='md' color='brand.600'>
          <Box border='1px' borderColor='brand.600'>
            <GetName index={index} />
            <GetAmount index={index} />
            <GetIngredientMeta index={index} />
            <GetImage index={index} />
          </Box>
        </VStack>
      </WrapItem>
      ))}
    </Wrap>
    <ButtonGroup colorScheme={'brand'} justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <Button onClick={() => setNumIngredients(numIngredients + 1)} bg='brand.400' color='brand.600'
        border='1px' borderColor={'brand.400'} boxShadow={'md'} _hover={{ bg: 'brand.200'}}
        >＋ Ingredient</Button>
      <IconButton icon={<CloseIcon boxSize={3} />} onClick={() => setNumIngredients(numIngredients - 1)} 
        border='1px' borderColor={'brand.400'} boxShadow={'md'} _hover={{ bg: 'brand.200'}}
        bg='brand.400' color='brand.600' />
    </ButtonGroup>
    </Container>
  )
}

// Function to get the steps in the recipe
const GetSteps = () => {
  const { register, errors } = useFormContext();
  const [numSteps, setNumSteps] = useState(1);

  // Function to get the action of each step in the recipe
  function GetAction({ index }) {
    return (
      <>
      <Tooltip label="What're the actions for this step of the recipe?">
        <Textarea py={2} px={2} placeholder="...action, eg. crack eggs into a bowl, use a fork to mix with salt and pepper" variant={'flushed'} isInvalid={false}
          {...register(`steps[${index}].action`, {required: 'Add an action',
          maxLength: {value: 280, message: 'Action must be less than 280 characters'}})} />
      </Tooltip>
      {errors.steps && errors.steps[index] && errors.steps[index].action && (
      <FormErrorMessage>
        {errors.steps[index].action && errors.steps[index].action.message}
      </FormErrorMessage>)}
      </>
    )
  }

// Function to get the trigger for the next step in the recipe
  function GetTrigger({ index }) {
    return (
      <Tooltip label="What triggers the next step of the recipe?">
        <Textarea py={2} px={2} placeholder="...trigger, eg. stir until contents are mixed well" variant={'flushed'} isInvalid={false}
          {...register(`steps[${index}].trigger`, 
          {maxLength: {value: 280, message: 'Trigger must be less than 280 characters'}})} />
      </Tooltip>
    )
  }

  // Function to get the meta of the step
  function GetStepMeta({ index }) {
    return (
      <>
      <Tooltip label="How does the action(s) taken in this step affect the taste?">
        <Textarea py={2} px={2} placeholder="...step's meta, eg. replace pepper with red chilli powder to this mix to make it spicy" variant={'flushed'} isInvalid={false}
          {...register(`steps[${index}].stepMeta`, {
          maxLength: {value: 280, message: 'Meta must be less than 280 characters'}})} />
      </Tooltip>
      {errors.steps && errors.steps[index] && errors.steps[index].stepMeta && (
      <FormErrorMessage>
        {errors.steps[index].stepMeta && errors.steps[index].stepMeta.message}
      </FormErrorMessage>)}
      </>
    )
  }

  // Function to get the image of the action
  function GetActionImage({ index }) {
    return (
      <Tooltip label="Add an image of the action">
        <Input py={2} px={2} placeholder="...image" type='file' variant={'flushed'} isInvalid={false}
        {...register(`steps[${index}].actionImage`)} />
      </Tooltip>
    )
  }

  // Function to get the image of the trigger
  function GetTriggerImage({ index }) {
    return (
      <Tooltip label="Add an image of the trigger">
        <Input py={2} px={2} placeholder="...image" type='file' variant={'flushed'} isInvalid={false}
        {...register(`steps[${index}].triggerImage`)} />
      </Tooltip>
    )
  }

return (
  <Container p={2} m={2} bg='brand.500' boxShadow={'dark-lg'} centerContent>
  <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Steps</Text>
  <Wrap bg='brand.400' boxShadow={'md'}>
  {Array.from({ length: numSteps }, (_, index) => (
    <WrapItem key={index} p={2}>
      <VStack boxShadow={'md'} justifyContent="space-between" alignItems="center" mt={4} p={2} color='brand.600'>
        <Text fontSize={'xl'} as='u' color='brand.600' fontWeight='bold'>Step {index + 1}</Text>
        <Box border='1px' borderColor='brand.600'>
          <GetAction index={index} />
          <GetActionImage index={index} />
        </Box>
        <Box border='1px' borderColor='brand.600'>
          <GetTrigger index={index} />
          <GetTriggerImage index={index} />
        </Box>
        <Box border='1px' borderColor='brand.600'>
          <GetStepMeta index={index} />
        </Box>
      </VStack>
    </WrapItem>
  ))}
  </Wrap>
  <ButtonGroup colorScheme={'brand'} justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
    <Button onClick={() => setNumSteps(numSteps + 1)} bg='brand.400' color='brand.600'
    border='1px' borderColor={'brand.400'} boxShadow={'md'} _hover={{ bg: 'brand.200'}}
    >＋ Step</Button>
    <IconButton icon={<CloseIcon boxSize={3} />} onClick={() => setNumSteps(numSteps - 1)}
    border='1px' borderColor={'brand.400'} boxShadow={'md'} _hover={{ bg: 'brand.200'}}
    bg='brand.400' color='brand.600' />
  </ButtonGroup>
  </Container>
)
}

// Function to get the metaquality tags of the recipe
function GetMetaQualityTags() {
  const { register } = useFormContext();
  const [numTags, setNumTags] = useState(1);

  // Function to get the tag of the metaquality
  function GetTag({ index }) {
    return (
      <Tooltip label="What're the qualities of this recipe? How does this recipe taste? What other recipes does it work well with?">
        <Input py={2} px={2} placeholder="...tag, eg. high protien" variant={'flushed'} isInvalid={false}
          {...register(`metaQualityTags[${index}]`)} />
      </Tooltip>
    )
  }

  return (
    <Container p={2} m={2} bg='brand.500' boxShadow={'dark-lg'} centerContent>
      <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Metaquality Tags</Text>
      <Wrap bg='brand.400' boxShadow={'md'}>
      {Array.from({ length: numTags }, (_, index) => (
        <WrapItem key={index} p={2}>
          <VStack boxShadow={'md'} justifyContent="space-between" alignItems="center" mt={4} p={2} color='brand.600'>
            <Text fontSize={'xl'} as='u' color='brand.600' fontWeight='bold'>Metaquality {index + 1}</Text>
            <Box border='1px' borderColor='brand.600'>
              <GetTag index={index} />
            </Box>
          </VStack>
        </WrapItem>
      ))}
      </Wrap>
      <ButtonGroup colorScheme={'brand'} justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <Button onClick={() => setNumTags(numTags + 1)} bg='brand.400' color='brand.600'
        border='1px' borderColor={'brand.400'} boxShadow={'md'} _hover={{ bg: 'brand.200'}}
        >＋ Metaquality Tag</Button>
        <IconButton icon={<CloseIcon boxSize={3} />} onClick={() => setNumTags(numTags - 1)}
        border='1px' borderColor={'brand.400'} boxShadow={'md'} _hover={{ bg: 'brand.200'}}
        bg='brand.400' color='brand.600' />
      </ButtonGroup>
    </Container>
  )
}

// Function to get the equipment used in the recipe
function GetEquipment() {
  const { register } = useFormContext();

  return (
    <Container p={2} m={2} bg='brand.500' boxShadow={'dark-lg'} centerContent>
      <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Equipment</Text>
      <Editable
        placeholder="...equipment, eg. fork, spatula, pan"
        isPreviewFocusable={true}
        selectAllOnFocus={false}>
        <Tooltip label="List the equipment used, separated by commas.">
          <EditablePreview
            py={2}
            px={2}
            _hover={{
              background: useColorModeValue("brand.400", "brand.600")
            }}
          />
        </Tooltip>
        <Input py={2} px={2} as={EditableTextarea} isInvalid={false} {...register('equipment')} />
      </Editable>
    </Container>
  )
}


export default CreateRecipe;