import { Dish } from "../types";
import { callOpenAIApi } from "./openAIService";
import { getTodoistItems } from "./todoistService";

// Function to get recipe recommendations based on ingredients from Todoist
export const getRecipeRecommendationsFromTodoist = async (): Promise<
  Dish[]
> => {
  try {
    // Get ingredients from Todoist
    const ingredients = await getTodoistItems();

    if (ingredients.length === 0) {
      throw new Error("No ingredients found in Todoist");
    }

    // Call the OpenAI service to get recipe recommendations
    const recommendations = await callOpenAIApi(ingredients);
    return recommendations;
  } catch (error) {
    console.error("Error getting recipe recommendations from Todoist:", error);
    throw error;
  }
};

// Original function for backwards compatibility
export const getRecipeRecommendations = async (
  ingredients: string[]
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
