import { Ingredient, Dish } from "../types";

// API call to OpenAI
export const callOpenAIApi = async (
  ingredients: Ingredient[]
): Promise<Dish[]> => {
  try {
    const ingredientNames = ingredients?.map((ing) => ing.name);

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
    return [
      {
        name: "Mock Dish",
        description: "A delicious mock dish based on ingredients.",
        ingredients: ingredientNames,
      },
    ];
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to get recipes from OpenAI");
  }
};
