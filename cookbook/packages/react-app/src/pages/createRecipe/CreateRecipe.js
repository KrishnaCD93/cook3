import { EditablePreview, useColorModeValue, IconButton, Input, useEditableControls, ButtonGroup, Editable, Tooltip, EditableInput, EditableTextarea, Heading, Container, CSSReset } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm } from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl, Button } from '@chakra-ui/react'
import React, { useState } from 'react';

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({name: '', description: '', ingredients: [], steps: []});

  const { handleSubmit, register, formState: { errors, isSubmitting }, } = useForm()

  const onSubmit = (data) => {
    console.log(data);
    setRecipe(data);
  }

  return (
    <>
    <CSSReset />
    <Container w='100%' h='100vh' centerContent>
      <Heading>Create Recipe</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">
            <GetRecipeName register={register} />
          </FormLabel>
          <FormLabel htmlFor="description">
            <GetDescription register={register} />
          </FormLabel>
          <FormLabel htmlFor="ingredients">
            <GetIngredients register={register} />
          </FormLabel>
          <FormLabel htmlFor="steps">
            <GetSteps register={register} />
          </FormLabel>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </form>
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
function GetRecipeName(props) {
  return (
    <>
    <Editable
      defaultValue="Recipe Name"
      isPreviewFocusable={true}
      selectAllOnFocus={false}>
      <Tooltip label="Click to add recipe name">
        <EditablePreview
          py={2}
          px={4}
          _hover={{
            background: useColorModeValue("brand.100", "brand.400")
          }}
        />
      </Tooltip>
      <Input py={2} px={4} as={EditableInput} 
      {...props.register('name', {required: 'Give your recipe a name'})} />
      <EditableControls />
    </Editable>
    </>
  )
}

  // Function to get the recipe description
function GetDescription(props) {
  return (
    <>
    <Editable
      defaultValue="Recipe Description"
      isPreviewFocusable={true}
      selectAllOnFocus={false}>
      <Tooltip label="Add a short description of the dish">
        <EditablePreview
          py={2}
          px={4}
          _hover={{
            background: useColorModeValue("brand.100", "brand.400")
          }}
        />
      </Tooltip>
      <Input py={2} px={4} as={EditableTextarea}
        {...props.register('description')} />
      <EditableControls />
    </Editable>
    </>
  )
}

// Function to get the ingredients in the recipe
function GetIngredients(props) {
  const [item, setItem] = useState({name: '', quantity: '', unit: '', nutritionalInfo: '', image: ''});
  
  return (
    <div>
      <h1>Input Ingredients</h1>
    </div>
  )
}

// Function to get the steps in the recipe
function GetSteps(props) {
  const [actions, setActions] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [myMeta, setMyMeta] = useState([]);
  
  // Function to get the action of each step in the recipe
  function GetAction(props) {
    return (
      <div>
        <h1>Input Action</h1>
      </div>
    )
  }

// Function to get the trigger for the next step in the recipe
  function GetTrigger(props) {
    return (
      <div>
        <h1>Input Trigger</h1>
      </div>
    )
  }

  // Function to get the meta of the step
  function GetMyMeta(props) {
    return (
      <div>
        <h1>Input Meta</h1>
      </div>
    )
  }

return (
  <div>
    <h1>Input Steps</h1>
  </div>
)
}

export default CreateRecipe;