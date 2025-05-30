import { Ingredient, Dish } from '../types';

// This is a mock function to simulate calling OpenAI API
export const getRecipeRecommendations = async (ingredients: Ingredient[]): Promise<Dish[]> => {
  // In a real application, we would call OpenAI API here
  // For now, we'll return mock data based on the ingredients provided
  
  // Let's simulate a delay to mimic an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const ingredientNames = ingredients.map(ing => ing.name.toLowerCase());
  
  // Simple logic to recommend dishes based on available ingredients
  let recommendations: Dish[] = [];
  
  if (ingredientNames.includes('rice') && ingredientNames.includes('chicken')) {
    recommendations.push({
      name: 'Chicken Fried Rice',
      description: 'A delicious stir-fried dish made with rice, chicken, and vegetables.',
      ingredients: ['Rice', 'Chicken', 'Onions', 'Garlic', 'Eggs']
    });
  }
  
  if (ingredientNames.includes('pasta') && ingredientNames.includes('tomatoes')) {
    recommendations.push({
      name: 'Simple Pasta with Tomato Sauce',
      description: 'Classic pasta dish with fresh tomato sauce and garlic.',
      ingredients: ['Pasta', 'Tomatoes', 'Garlic', 'Onions']
    });
  }
  
  if (ingredientNames.includes('potatoes') && ingredientNames.includes('butter')) {
    recommendations.push({
      name: 'Buttery Mashed Potatoes',
      description: 'Creamy mashed potatoes with butter and a hint of garlic.',
      ingredients: ['Potatoes', 'Butter', 'Milk', 'Garlic']
    });
  }
  
  if (ingredientNames.includes('eggs') && ingredientNames.includes('milk')) {
    recommendations.push({
      name: 'Fluffy Scrambled Eggs',
      description: 'Soft and fluffy scrambled eggs made with milk.',
      ingredients: ['Eggs', 'Milk', 'Butter']
    });
  }
  
  // Ensure we return at most 3 recommendations
  return recommendations.slice(0, 3);
};
