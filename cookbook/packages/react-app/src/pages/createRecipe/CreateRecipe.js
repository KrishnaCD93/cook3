import { EditablePreview, useColorModeValue, IconButton, Input, useEditableControls, ButtonGroup, Editable, Tooltip, EditableInput, EditableTextarea, Heading, Container, CSSReset, Box, Text, Textarea, VStack, StackDivider, Wrap, WrapItem } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl, Button } from '@chakra-ui/react'
import React, { useState } from 'react';
import { Body } from "../../components";
import useFleekStorage from "../../hooks/useFleekStorage";
import { useAccount } from 'wagmi'

const CreateRecipe = () => {
  const [, fleekStorageUploadRecipeData, fleekStorageUploadRecipeImages] = useFleekStorage();
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
        let cookbookId = 0
        let name = formData.name
        let description = formData.description
        let ingredients = []
        let steps = []
        let metaQualityTags = []
        let imageInfo = []
        if (formData.recipeImage) {
          imageInfo.push({
            name: name,
            type: 'recipe',
            image: formData.recipeImage[0]
          })
        }
        formData.ingredients.forEach((ingredient) => {
          if (!ingredient.image) {
            ingredients.push({
              name: ingredient.name,
              quantity: ingredient.quantity,
              ingredientMeta: ingredient.ingredientMeta
            })
          } else if (ingredient.image) {
            ingredients.push({
              name: ingredient.name,
              quantity: ingredient.quantity,
              ingredientMeta: ingredient.ingredientMeta
            })
            imageInfo.push({
              name: ingredient.name,
              type: 'ingredient',
              image: ingredient.image[0]
            })
          }
        })
        formData.steps.forEach((step, index) => {
          if (!step.actionImage && !step.triggerImage) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              myMeta: step.myMeta
            })
          } else if (step.actionImage && step.triggerImage) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              myMeta: step.myMeta
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
          } else if (step.actionImage && !step.triggerImage) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              myMeta: step.myMeta
            })
            imageInfo.push({
              name: `step-${index + 1}-action`,
              type: 'action',
              image: step.actionImage[0]
            })
          } else if (!step.actionImage && step.triggerImage) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              myMeta: step.myMeta
            })
            imageInfo.push({
              name: `step-${index + 1}-trigger`,
              type: 'trigger',
              image: step.triggerImage[0]
            })
          }
          formData.metaQualityTags.forEach((tag) => {
            metaQualityTags.push(tag)
          })
        })
        let recipe = { userId, cookbookId, name, description, ingredients, steps, metaQualityTags }
        console.log(recipe);
        let uploadRecipe = await fleekStorageUploadRecipeData(recipe);
        console.log('uploaded data: ', uploadRecipe);
        let uploadImages = await fleekStorageUploadRecipeImages(imageInfo, name, userId, cookbookId);
        console.log('uploaded images: ', uploadImages);
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
      placeholder="...name"
      isPreviewFocusable={true}
      selectAllOnFocus={false}>
      <Tooltip label="Give your recipe a name">
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
      placeholder="...description"
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
        <Input py={2} px={2} placeholder="...name" variant={'flushed'} isInvalid={false}
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
        <Input py={2} px={2} placeholder="...amount" variant={'flushed'} isInvalid={false}
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
        <Textarea py={2} px={2} placeholder="...ingredient's meta" variant={'flushed'} isInvalid={false}
        {...register(`ingredients[${index}].ingredientMeta`)} />
      </Tooltip>
    )
  }

  // Function to get a picture of the ingredient
  function GetImage({ index }) {
    return (
      <Tooltip label="Add an image of the ingredient">
        <Input py={2} px={2} placeholder="...image" type='file' variant={'flushed'} isInvalid={false}
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
        <Textarea py={2} px={2} placeholder="...action" variant={'flushed'} isInvalid={false}
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
      <>
      <Tooltip label="What triggers the next step of the recipe?">
        <Textarea py={2} px={2} placeholder="...trigger" variant={'flushed'} isInvalid={false}
          {...register(`steps[${index}].trigger`, {required: 'Add an trigger',
          maxLength: {value: 280, message: 'Trigger must be less than 280 characters'}})} />
      </Tooltip>
      {errors.steps && errors.steps[index] && errors.steps[index].trigger && (
      <FormErrorMessage>
        {errors.steps[index].trigger && errors.steps[index].trigger.message}
      </FormErrorMessage>)}
      </>
    )
  }

  // Function to get the meta of the step
  function GetStepMeta({ index }) {
    return (
      <>
      <Tooltip label="How does the action(s) taken in this step affect the taste?">
        <Textarea py={2} px={2} placeholder="...step's meta" variant={'flushed'} isInvalid={false}
          {...register(`steps[${index}].myMeta`, {
          maxLength: {value: 280, message: 'Meta must be less than 280 characters'}})} />
      </Tooltip>
      {errors.steps && errors.steps[index] && errors.steps[index].myMeta && (
      <FormErrorMessage>
        {errors.steps[index].myMeta && errors.steps[index].myMeta.message}
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
      <>
      <Tooltip label="What're the qualities of this recipe? How does this recipe taste? What other recipes does it work well with?">
        <Input py={2} px={2} placeholder="...tag" variant={'flushed'} isInvalid={false}
          {...register(`metaQualityTags[${index}]`)} />
      </Tooltip>
      </>
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

export default CreateRecipe;