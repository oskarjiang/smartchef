import { Ingredient, Dish } from "../types";

// API call to OpenAI
export const callOpenAIApi = async (
  ingredients: Ingredient[]
): Promise<Dish[]> => {
  try {
    // In production, this would make a real API call to OpenAI
    // But for now, we'll simulate the API call

    const ingredientNames = ingredients.map((ing) => ing.name);

    console.log("Calling OpenAI API with ingredients:", ingredientNames);

    // In a real implementation, we would make an API call like this:
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful cooking assistant that suggests dishes based on available ingredients.'
          },
          {
            role: 'user',
            content: `I have these ingredients: ${ingredientNames.join(', ')}. 
                     Suggest three dishes I can make. 
                     Return only a JSON array with 3 objects containing: 
                     name (string), description (string), and ingredients (array of strings).`
          }
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the returned JSON
    const dishes = JSON.parse(content);
    return dishes;
    */

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return mock data based on ingredients
    return generateMockRecipes(ingredientNames);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to get recipes from OpenAI");
  }
};

// Helper function to generate mock recipes based on ingredients
function generateMockRecipes(ingredientNames: string[]): Dish[] {
  const lowercaseIngredients = ingredientNames.map((ing) => ing.toLowerCase());
  const recipes: Dish[] = [];

  // Recipe suggestions based on ingredient combinations
  if (lowercaseIngredients.includes("rice")) {
    if (lowercaseIngredients.includes("chicken")) {
      recipes.push({
        name: "Chicken Fried Rice",
        description:
          "A delicious stir-fried dish made with rice, chicken, and vegetables.",
        ingredients: ["Rice", "Chicken", "Onions", "Garlic", "Eggs"],
      });
    } else if (lowercaseIngredients.includes("eggs")) {
      recipes.push({
        name: "Egg Fried Rice",
        description: "Simple and tasty fried rice with scrambled eggs.",
        ingredients: ["Rice", "Eggs", "Onions", "Garlic"],
      });
    } else {
      recipes.push({
        name: "Steamed Rice",
        description: "Perfectly cooked rice that pairs well with any dish.",
        ingredients: ["Rice", "Water", "Salt"],
      });
    }
  }

  if (lowercaseIngredients.includes("pasta")) {
    if (lowercaseIngredients.includes("tomatoes")) {
      recipes.push({
        name: "Simple Tomato Pasta",
        description: "Quick and easy pasta with fresh tomato sauce.",
        ingredients: ["Pasta", "Tomatoes", "Garlic", "Onions"],
      });
    } else if (
      lowercaseIngredients.includes("butter") &&
      lowercaseIngredients.includes("garlic")
    ) {
      recipes.push({
        name: "Garlic Butter Pasta",
        description: "Creamy and aromatic pasta tossed in garlic butter.",
        ingredients: ["Pasta", "Butter", "Garlic", "Salt"],
      });
    }
  }

  if (lowercaseIngredients.includes("potatoes")) {
    if (
      lowercaseIngredients.includes("butter") &&
      lowercaseIngredients.includes("milk")
    ) {
      recipes.push({
        name: "Creamy Mashed Potatoes",
        description: "Smooth and creamy mashed potatoes with butter and milk.",
        ingredients: ["Potatoes", "Butter", "Milk", "Salt"],
      });
    } else {
      recipes.push({
        name: "Roasted Potatoes",
        description: "Simple and delicious oven-roasted potatoes.",
        ingredients: ["Potatoes", "Olive Oil", "Salt", "Garlic"],
      });
    }
  }

  if (lowercaseIngredients.includes("eggs")) {
    if (lowercaseIngredients.includes("milk")) {
      recipes.push({
        name: "Fluffy Scrambled Eggs",
        description: "Light and fluffy scrambled eggs made with milk.",
        ingredients: ["Eggs", "Milk", "Butter", "Salt"],
      });
    } else {
      recipes.push({
        name: "Classic Omelette",
        description:
          "A simple yet delicious omelette that can be customized with fillings.",
        ingredients: ["Eggs", "Butter", "Salt", "Pepper"],
      });
    }
  }

  // If we couldn't generate specific recommendations, add some generic ones
  if (recipes.length < 3) {
    if (
      !recipes.some((r) => r.name.includes("Salad")) &&
      lowercaseIngredients.includes("tomatoes") &&
      lowercaseIngredients.includes("onions")
    ) {
      recipes.push({
        name: "Simple Salad",
        description: "A refreshing salad with fresh vegetables.",
        ingredients: ["Tomatoes", "Onions", "Salt", "Olive Oil"],
      });
    }

    if (
      !recipes.some((r) => r.name.includes("Sandwich")) &&
      lowercaseIngredients.includes("eggs")
    ) {
      recipes.push({
        name: "Egg Sandwich",
        description: "Quick and filling egg sandwich for breakfast or lunch.",
        ingredients: ["Eggs", "Bread", "Butter", "Salt"],
      });
    }
  }

  // Return up to 3 recipes
  return recipes.slice(0, 3);
}
