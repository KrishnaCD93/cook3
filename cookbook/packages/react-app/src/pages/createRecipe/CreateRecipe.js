import { EditablePreview, useColorModeValue, IconButton, Input, useEditableControls, ButtonGroup, Editable, Tooltip, EditableInput, EditableTextarea, Heading, Container, CSSReset, Flex, Box, Text, Textarea, VStack } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl, Button } from '@chakra-ui/react'
import React, { useState } from 'react';
import { Body } from "../../components";
import useFleekStorage from "../../hooks/useFleekStorage";
import { useAccount } from 'wagmi'

const CreateRecipe = () => {
  const [, fleekStorageUploadRecipe,] = useFleekStorage();
  const { data: account } = useAccount();
  const [uploading, setUploading] = useState(false);
  const recipe = {
    name: '',
    description: '',
    ingredients: [],
    steps: [],
    userId: '',
    cookbookId: '',
  }
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({defaultValues: recipe})

  const onSubmit = async (formData) => {
    try {
      if (!account) {
        alert('Please connect to Ethereum')
        return;
      } else {
        setUploading(true);
        console.log(formData);
        let userId = account.address;
        let cookbookId = 0;
        let name = formData.name
        let description = formData.description
        let ingredients = []
        let steps = []
        formData.ingredients.forEach((ingredient) => {
          if (!ingredient.image) {
            ingredients.push({
              name: ingredient.name,
              quantity: ingredient.quantity,
              ingredientMeta: ingredient.ingredientMeta,
              image: ''
            })
          } else if (ingredient.image) {
              ingredients.push({
                name: ingredient.name,
                quantity: ingredient.quantity,
                ingredientMeta: ingredient.ingredientMeta,
                image: URL.createObjectURL(ingredient.image[0])
            })
          }
        })
        formData.steps.forEach((step) => {
          if (!step.image) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              myMeta: step.myMeta,
              image: ''
            })
          } else if (step.image) {
            steps.push({
              action: step.action,
              trigger: step.trigger,
              myMeta: step.myMeta,
              image: URL.createObjectURL(step.image[0])
            })
          }
        })
        let recipe = { userId, cookbookId, name, description, ingredients, steps }
        console.log('recipe: ', recipe)
        let uploadRecipe = await fleekStorageUploadRecipe(recipe);
        console.log('uploaded data: ', uploadRecipe);
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
    <Container w='100%' centerContent>
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
              <Text fontSize='2xl' fontWeight='bold'>Ingredients</Text>
              <GetIngredients />
            </FormLabel>
            <FormLabel htmlFor="steps">
              <Text fontSize='2xl' fontWeight='bold'>Steps</Text>
              <GetSteps />
            </FormLabel>
          </FormControl>
          <Button mt={4} colorScheme='brand' isLoading={isSubmitting} type='submit'>
            Create Recipe
          </Button>
        </form>
      </FormProvider>
    </Container>
    </Body>
  )
}

function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2} colorScheme='brand'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton
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
    <>
    <Text fontSize='2xl' fontWeight='bold'>Recipe Name</Text>
    <Editable
      placeholder="...name"
      isPreviewFocusable={true}
      selectAllOnFocus={false}>
      <Tooltip label="Click to add recipe name">
        <EditablePreview
          py={2}
          px={2}
          _hover={{
            background: useColorModeValue("brand.400", "brand.600")
          }}
        />
      </Tooltip>
      <Input py={2} px={2} as={EditableInput}
      {...register('name', {required: 'Give your recipe a name'})} />
      <FormErrorMessage>
        {errors.name && errors.name.message}
      </FormErrorMessage>
      <EditableControls />
    </Editable>
    </>
  )
}

  // Function to get the recipe description
function GetDescription() {
  const { register, errors } = useFormContext();
  return (
    <>
    <Text fontSize='2xl' fontWeight='bold'>Description</Text>
    <Editable
      placeholder="...description"
      isPreviewFocusable={true}
      selectAllOnFocus={false}>
      <Tooltip label="Add a short description of the dish, not required">
        <EditablePreview
          py={2}
          px={2}
          _hover={{
            background: useColorModeValue("brand.400", "brand.600")
          }}
        />
      </Tooltip>
      <Input py={2} px={2} as={EditableTextarea}
        {...register('description')} />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      <EditableControls />
    </Editable>
    </>
  )
}

// Function to get the ingredients in the recipe
const GetIngredients = () => {
  const { register, errors } = useFormContext();
  const [numIngredients, setNumIngredients] = useState(1);

  function GetName({ index }) {
    return (
      <>
      <Tooltip label="Add some ingredients">
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

  function GetIngredientMeta({ index }) {
    return (
      <Tooltip label="Add any notes such as preparation or storage instructions, not required">
        <Textarea py={2} px={2} placeholder="...ingredient meta" variant={'flushed'} isInvalid={false}
        {...register(`ingredients[${index}].ingredientMeta`)} />
      </Tooltip>
    )
  }

  function GetImage({ index }) {
    return (
      <Tooltip label="Add an image of the ingredient">
        <Input py={2} px={2} placeholder="...image" type='file' variant={'flushed'} isInvalid={false}
        {...register(`ingredients[${index}].image`)} />
      </Tooltip>
    )
  }

  return (
    <>
    {Array.from({ length: numIngredients }, (_, index) => (
    <Flex justifyContent="space-between" alignItems="center" mt={4} key={index}>
      <Box>
        <GetName index={index} />
      </Box>
      <Box>
        <GetAmount index={index} />
      </Box>
      <Box>
        <GetIngredientMeta index={index} />
      </Box>
      <Box>
        <GetImage index={index} />
      </Box>
    </Flex>
    ))}
    <ButtonGroup colorScheme={'brand'} justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <Button onClick={() => setNumIngredients(numIngredients + 1)}>＋ Ingredient</Button>
      <IconButton icon={<CloseIcon boxSize={3} />} onClick={() => setNumIngredients(numIngredients - 1)} />
    </ButtonGroup>
    </>
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
  function GetMyMeta({ index }) {
    return (
      <>
      <Tooltip label="Do you use any special tricks in this step of the recipe? Not required">
        <Textarea py={2} px={2} placeholder="...meta" variant={'flushed'} isInvalid={false}
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

  // Function to get the image of the step
  function GetImage({ index }) {
    return (
      <Tooltip label="Add an image of the step">
        <Input py={2} px={2} placeholder="...image" type='file' variant={'flushed'} isInvalid={false}
        {...register(`steps[${index}].image`)} />
      </Tooltip>
    )
  }

return (
  <Container p={2} m={2} centerContent>
  <Flex p={2} m={2} overflowWrap="wrap">
  {Array.from({ length: numSteps }, (_, index) => (
    <VStack justifyContent="space-between" alignItems="center" mt={4} key={index}>
      <Text fontSize={'xl'} fontWeight='bold'>Step {index + 1}</Text>
      <Box>
        <GetAction index={index} />
      </Box>
      <Box>
        <GetTrigger index={index} />
      </Box>
      <Box>
        <GetMyMeta index={index} />
      </Box>
      <Box>
        <GetImage index={index} />
      </Box>
    </VStack>
  ))}
  </Flex>
  <ButtonGroup colorScheme={'brand'} justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
    <Button onClick={() => setNumSteps(numSteps + 1)}>＋ Step</Button>
    <IconButton icon={<CloseIcon boxSize={3} />} onClick={() => setNumSteps(numSteps - 1)} />
  </ButtonGroup>
  </Container>
)
}

export default CreateRecipe;