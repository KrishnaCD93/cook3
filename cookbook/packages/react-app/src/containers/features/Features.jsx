import { Text } from '@react-three/drei';
import React from 'react';
import { Feature } from '../../components';
import { useThree } from '@react-three/fiber';

const recipe_1 = {name: 'Eggplant Pasta', desc: 'Indian Style Eggplant Pasta',
ingredients: [{'Eggplant, long': 2}, {'Pasta': 'As needed'}, {'Onion': 1}, 
  {'Salt': 'To taste'}, {'Pepper': 'To taste'}, {'Oil': 'As needed'}, {'Garlic Powder': 'As needed'},
  {'Chilli Powder': 'As needed'}, {'Marinara Sauce': 'As needed'}, {'Basil': 'As needed'}],
  steps: [{'Chop the eggplants and onions and roast at 425 degrees for about 10 minutes, flip and roast for another 5 mins.': 'Remove when lightly browned.'},
  {'Cook pasta in boiling water for about 10 minutes.': 'Cook until al dente in texture.'},{'Heat up the sauce in a pan and add the pasta, roasted eggplant, and onion.': 'Stir until the sauce coats the eggplants and pasta.'},
  {'Garnish with pepper, basil, and cheese.': 'Serve meal.'}],
  myMeta: ['Toss with oil, salt, chilli powder, and garlic powder.', 'Add a pinch of salt to the boiling water.', 
  'Add a bit of turmeric, garam masala, and red chilli powder.', "Coriander is a good replacement herb if using garam masala, don't add cheese.", 'Serve with garlic bread or toast.']};
const recipe_2 = {name:'Omelette', desc: 'Omelette, Indian Style',
ingredients: [{'Eggs, large': 2}, {'Ghee': '1 tblsp'}, {'Grated Cheese': '2 tblsp'},
  {'Tomatoes': 1}, {'Herbs': 'Assorted'}, {'Salt': 'To taste'}, {'Pepper': 'To taste'}],
  steps: [{'Beat the eggs in a bowl with salt and pepper.': 'Beat until thouroughly mixed'}, {'Add ghee to a skillet on medium-low heat.': 'Wait till the ghee warms up.'},
  {'Add eggs to skillet. As the edges start to set, repeatedly push the edges towards the center of the pan to cook the egg evenly.': 'Cook for about 6 minutes.'},
  {'Add cheese, tomatoes, and herbs.': 'Cook until eggs are set but still soft.'}, {'Fold and garnish with herbs.': 'Serve meal.'}],
  myMeta: ['Replace pepper with chilli flakes or red chilli powder.', '', 'If eggs break, add turmeric and red chilli powder to make scrambled egg curry.', 'Also add chopped onions and green peppers.', 'Serve with toast or roti.']};
const recipe_3 = {name: 'Vegetable Stir Fry', desc: 'Vegetable Stir Fry, Indian Style',
  ingredients: [{'Vegetables': 'As needed'}, {'Onion': 1}, {'Honey': 'To taste'}, {'Pepper': 'To taste'},
  {'Oil': 'As needed'}, {'Garlic Powder': 'As needed'}, {'Chilli Powder': 'As needed'}, {'Balsamic Vinegar': 'As needed'},
  {'Soy Sauce': 'As needed'}, {'Herbs': 'As needed'}], steps: [{'Prep the ingredients.': 'Chop garlic, onions, ginger, and thaw any frozen vegetables'}, 
  {'Heat up the oil in a pan on medium heat and add the vegetables.': 'Cook for about 5 minutes.'}, {'Add the sauce: Add equal amounts of soy sauce and vinegar, 1/4 amount honey, and water as required.': 'Cook for another 5 minutes.'},
  {'Garnish with herbs and pepper.': 'Serve meal with rice.'}], myMeta: ['I use broccoli, cauliflower, peas, green beans, and baby corn and thaw the frozen vegetables with water.', 
  'Add red chilli powder, turmeric, and salt.', 'Stir and reduce the water.', 'Pour a bit of sesame oil on the dish.']};

const Features = (props) => {
  let url_1 = FeatureImage({ name: recipe_1.name, desc: recipe_1.desc, metaSkillCount: recipe_1.myMeta.length });
  let url_2 = FeatureImage({ name: recipe_2.name, desc: recipe_2.desc, metaSkillCount: recipe_2.myMeta.length });
  let url_3 = FeatureImage({ name: recipe_3.name, desc: recipe_3.desc, metaSkillCount: recipe_3.myMeta.length });


  const { width } = useThree((state) => state.viewport)
  return(
    <>
    <color attach="background" args={['#282c34']} />
    <ambientLight />
    <Text position={[0, 15, -5]}
      lineHeight={0.8}
      font="/Ki-Medium.ttf"
      fontSize={width / 12}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle">View Krishna's Cookbook!</Text>
    <Feature position={[-30, -5, 0]} args={[20, 20]} recipe={recipe_1} url={url_1} {...props} />
    <Feature position={[0, -5, 0]} args={[20, 20]} recipe={recipe_2} url={url_2} {...props} />
    <Feature position={[30, -5, 0]} args={[20, 20]} recipe={recipe_3} url={url_3} {...props} />
    </>
  )
}

// Draw an svg with the recipe name as the text
function FeatureImage({ name, desc, metaSkillCount }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">
      <style>
        {`.base { fill: white; font-family: serif; font-size: 14px; }
        .skill { fill: white; font-family: serif; font-size: 10px; }`}
      </style>
      <rect width="100%" height="100%" fill="black" />
      <text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">{name}</text>
      <text x="50%" y="60%" class="base" dominant-baseline="middle" text-anchor="middle">{desc}</text>
      <text x="50%" y="75%" class="skill" dominant-baseline="middle" text-anchor="middle">Meta Skills: {metaSkillCount}</text>
    </svg>
  )
}

export default Features;