import { EditablePreview, useColorModeValue, IconButton, Input, useEditableControls, ButtonGroup, Editable, Tooltip, EditableInput, EditableTextarea, Heading, Container, CSSReset, Flex, Box, Text } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl, Button } from '@chakra-ui/react'
import React, { useState } from 'react';

const CreateRecipe = () => {
  const recipe = {name: '', description: '', ingredients: [], steps: []};

  const { handleSubmit, register, formState: { errors, isSubmitting }, } = useForm()

  const onSubmit = (data) => {
    recipe.name = data.name
    recipe.description = data.description
    data.ingredients.forEach((ingredient) => {
      if (ingredient.name) {
        recipe.ingredients.push({
          name: ingredient.name,
          quantity: ingredient.quantity,
          nutritionInfo: ingredient.nutritionInfo
        })
      }
    })
    data.steps.forEach((step) => {
      if (step.action) {
        recipe.steps.push({
          action: step.action,
          trigger: step.trigger,
          myMeta: step.myMeta
        })
      }
    })
    console.log(recipe)
  }

  return (
    <>
    <CSSReset />
    <Container w='100%' h='100vh' centerContent>
      <Heading>Create Recipe</Heading>
      <FormProvider {...{ register, errors, isSubmitting }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name}>
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
          </FormControl>
          <Button mt={4} colorScheme='brand' isLoading={isSubmitting} type='submit'>
            Submit
          </Button>
        </form>
      </FormProvider>
    </Container>
    </>
  )
}

function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
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
      defaultValue="...name"
      isPreviewFocusable={true}
      selectAllOnFocus={false}>
      <Tooltip label="Click to add recipe name">
        <EditablePreview
          py={2}
          px={4}
          _hover={{
            background: useColorModeValue("brand.400", "brand.600")
          }}
        />
      </Tooltip>
      <Input py={2} px={4} as={EditableInput} 
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
          px={4}
          _hover={{
            background: useColorModeValue("brand.400", "brand.600")
          }}
        />
      </Tooltip>
      <Input py={2} px={4} as={EditableTextarea}
        {...register('description')} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      <EditableControls />
    </Editable>
    </>
  )
}

// Function to get the ingredients in the recipe
function GetIngredients() {
  const [numItems, setNumItems] = useState(1);
  const { register, errors } = useFormContext();

  function GetName(props) {
    return (
      <Editable
        defaultValue="...ingredient name"
        isPreviewFocusable={true}
        selectAllOnFocus={false}>
        <Tooltip label="Add some ingredients">
          <EditablePreview
            py={2}
            px={4}
            _hover={{
              background: useColorModeValue("brand.400", "brand.600")
            }}
          />
        </Tooltip>
        <Input py={2} px={4} as={EditableInput}
          {...register(`ingredients[${props.index}].name`, {required: 'Add an ingredient'})} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <EditableControls />
      </Editable>
    )
  }

  function GetAmount(props) {
    return (
      <Editable
        defaultValue="...quantity"
        isPreviewFocusable={true}
        selectAllOnFocus={false}>
        <Tooltip label="Add the quantity of the ingredient">
          <EditablePreview
            py={2}
            px={4}
            _hover={{
              background: useColorModeValue("brand.400", "brand.600")
            }}
          />
        </Tooltip>
        <Input py={2} px={4} as={EditableInput}
          {...register(`ingredients[${props.index}].quantity`, {required: 'Add a quantity'})} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <EditableControls />
      </Editable>
    )
  }

  function GetNutrition(props) {
    return (
      <Editable
        placeholder="...nutritional information"
        isPreviewFocusable={true}
        selectAllOnFocus={false}>
        <Tooltip label="Add any nutritional info, not required">
          <EditablePreview
            py={2}
            px={4}
            _hover={{
              background: useColorModeValue("brand.400", "brand.600")
            }}
          />
        </Tooltip>
        <Input py={2} px={4} as={EditableTextarea}
          {...register(`ingredients[${props.index}].nutritionInfo`)} />
        <EditableControls />
      </Editable>
    )
  }

  return (
    <>
    <Text fontSize='2xl' fontWeight='bold'>Ingredients</Text>
    {Array.from({ length: numItems }, (_, index) => (
    <Flex justifyContent="space-between" alignItems="center" mt={4} key={index}>
      <Box>
        <GetName index={index} />
      </Box>
      <Box>
        <GetAmount index={index} />
      </Box>
      <Box>
        <GetNutrition index={index} />
      </Box>
      </Flex>
    ))}
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2} colorScheme='brand'>
      <Button onClick={() => setNumItems(numItems + 1)}>Add Ingredient</Button>
      <IconButton icon={<CloseIcon boxSize={3} />} onClick={() => setNumItems(numItems - 1)} />
    </ButtonGroup>
    </>
  )
}

// Function to get the steps in the recipe
function GetSteps() {
  const [numSteps, setNumSteps] = useState(1);
  const { register, errors } = useFormContext();
  
  // Function to get the action of each step in the recipe
  function GetAction(props) {
    return (
      <Editable
        defaultValue="...action"
        isPreviewFocusable={true}
        selectAllOnFocus={false}>
        <Tooltip label="What're the actions for this step of the recipe?">
          <EditablePreview
            py={2}
            px={4}
            _hover={{
              background: useColorModeValue("brand.400", "brand.600")
            }}
          />
        </Tooltip>
        <Input py={2} px={4} as={EditableTextarea}
          {...register(`steps[${props.index}].action`, {required: 'Add an action',
          maxLength: {value: 280, message: 'Action must be less than 280 characters'}})} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <EditableControls />
      </Editable>
    )
  }

// Function to get the trigger for the next step in the recipe
  function GetTrigger(props) {
    return (
      <Editable
        defaultValue="...trigger"
        isPreviewFocusable={true}
        selectAllOnFocus={false}>
        <Tooltip label="What triggers the next step of the recipe?">
          <EditablePreview
            py={2}
            px={4}
            _hover={{
              background: useColorModeValue("brand.400", "brand.600")
            }}
          />
        </Tooltip>
        <Input py={2} px={4} as={EditableTextarea}
          {...register(`steps[${props.index}].trigger`, {required: 'Add an trigger',
          maxLength: {value: 280, message: 'Trigger must be less than 280 characters'}})} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <EditableControls />
      </Editable>
    )
  }

  // Function to get the meta of the step
  function GetMyMeta(props) {
    return (
      <Editable
        placeholder="...your meta"
        isPreviewFocusable={true}
        selectAllOnFocus={false}>
        <Tooltip label="Do you use any special tricks in this step of the recipe? Not required">
          <EditablePreview
            py={2}
            px={4}
            _hover={{
              background: useColorModeValue("brand.400", "brand.600")
            }}
          />
        </Tooltip>
        <Input py={2} px={4} as={EditableTextarea}
          {...register(`steps[${props.index}].action`, {
          maxLength: {value: 280, message: 'Meta must be less than 280 characters'}})} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <EditableControls />
      </Editable>
    )
  }

return (
  <>
    <Text fontSize={'2xl'} fontWeight='bold'>Steps</Text>
    {Array.from({ length: numSteps }, (_, index) => (
      <Flex justifyContent="space-between" alignItems="center" mt={4} key={index}>
        <Box>
          <GetAction index={index} />
        </Box>
        <Box>
          <GetTrigger index={index} />
        </Box>
        <Box>
          <GetMyMeta index={index} />
        </Box>
      </Flex>
    ))}
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2} colorScheme='brand'>
      <Button onClick={() => setNumSteps(numSteps + 1)}>Add Step</Button>
      <IconButton icon={<CloseIcon boxSize={3} />} onClick={() => setNumSteps(numSteps - 1)} />
    </ButtonGroup>
  </>
)
}

export default CreateRecipe;