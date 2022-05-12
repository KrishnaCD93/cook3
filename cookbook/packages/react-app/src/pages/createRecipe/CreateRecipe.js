import { EditablePreview, useColorModeValue, IconButton, Input, useEditableControls, ButtonGroup, Editable, Tooltip, EditableInput, EditableTextarea, Heading, Container } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import React, {  useState } from 'react';

const CreateRecipe = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  
  return (
    <Container w='100%' h='100vh' centerContent>
      <Heading>Create Recipe</Heading>
      <GetRecipeName setName={setName} />
      <GetDescription setDescription={setDescription} />
      <GetIngredients />
    </Container>
  )
}

function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
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
      <Input outline py={2} px={4} as={EditableInput} onChange={(e) => props.setName(e.target.value)} />
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
      <Input outline py={2} px={4} as={EditableTextarea} onChange={(e) => props.setDescription(e.target.value)} />
      <EditableControls />
    </Editable>
    </>
  )
}

// Function to get the ingredients in the recipe
function GetIngredients(props) {
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
  function getAction(props) {
    return (
      <div>
        <h1>Input Action</h1>
      </div>
    )
  }

// Function to get the trigger for the next step in the recipe
  function getTrigger(props) {
    return (
      <div>
        <h1>Input Trigger</h1>
      </div>
    )
  }

  // Function to get the meta of the step
  function getMyMeta(props) {
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