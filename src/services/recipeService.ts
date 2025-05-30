import { Ingredient, Dish } from "../types";
import { callOpenAIApi } from "./openAIService";

// Function to get recipe recommendations based on ingredients
export const getRecipeRecommendations = async (
  ingredients: Ingredient[]
): Promise<Dish[]> => {
  try {
    // Call the OpenAI service to get recipe recommendations
    const recommendations = await callOpenAIApi(ingredients);
    return recommendations;
  } catch (error) {
    console.error("Error getting recipe recommendations:", error);
    throw error;
  }
};
