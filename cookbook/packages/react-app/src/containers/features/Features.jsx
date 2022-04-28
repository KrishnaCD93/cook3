import React from 'react';

import { Feature } from '../../components';

const Features = (props) => {
  const recipe_1 = {name: 'Eggplant Pasta', desc: 'Indian Style Eggplant Pasta',
  ingredients: [{'Eggplant, long': 2}, {'Pasta': 'As needed'}, {'Onion': 1}, 
    {'Salt': 'To taste'}, {'Pepper': 'To taste'}, {'Oil': 'As needed'}, {'Garlic Powder': 'As needed'},
    {'Chilli Powder': 'As needed'}, {'Marinara Sauce': 'As needed'}, {'Basil': 'As needed'}],
    steps: ['Chop the eggplant and onion, place them on a baking tray. Toss with oil, salt, chilli powder, and garlic powder.', 'Roast at 425 degrees for about 10 minutes, flip and roast for another 5 mins. Remove when lightly browned.',
    'Cook pasta in boiling water for about 10 minutes. Cook until al dente in texture.','Heat up the sauce in a pan and add the pasta, roasted eggplant, and onion. Stir well.',
    'Garnish with basil and serve with cheese and pepper.'],
    myMeta: ['Olive oil is best for this recipe, but I also sometimes use ghee.', 'Poke small holes through the eggplant before placing the oven', 'Add a pinch of salt to the boiling water.', 
    'Add a bit of turmeric, garam masala, and red chilli powder.', "coriander is a good replacement herb if using garam masala, don't add cheese."], meal: 'Serve with garlic bread.'};
  const recipe_2 = {name:'Omelette', desc: 'Omelette, Indian Style',
  ingredients: [{'Eggs, large': 2}, {'Ghee': '1 tblsp'}, {'Grated Cheese': '2 tblsp'},
    {'Tomatoes': 1}, {'Herbs': 'Assorted'}, {'Salt': 'To taste'}, {'Pepper': 'To taste'}],
    steps: ['Beat the eggs in a bowl with salt and pepper. Beat thouroughly', 'Add ghee to a skillet on medium-low heat. Wait till the ghee warms up.','Add eggs to skillet. Cook until edges begin to set.',
    'Add cheese, tomatoes, and herbs. Cook until eggs are set but still soft.', 'Fold and serve.'],
    myMeta: ['Replace pepper with chilli flakes.', '', 'As the edges start to set, repeatedly push the edges towards the center of the pan to cook the egg evenly.', 'Also add chopped onions and green peppers.', 'Serve with toast or roti.']};

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