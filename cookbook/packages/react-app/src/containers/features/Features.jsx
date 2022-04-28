import React from 'react';

import { Feature } from '../../components';

const Features = (props) => {
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

  return(
    <>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Feature position={[-1.2, 0, 0]} recipe={recipe_1} {...props} />
    <Feature position={[1.2, 0, 0]} recipe={recipe_2} {...props} />
    </>
  )
}

export default Features;