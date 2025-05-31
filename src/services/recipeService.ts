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
      throw new Error(
        "Inga ingredienser hittades i Todoist-projektet 'Matinventarie'. Lägg till några ingredienser där först."
      );
    }

    console.log(
      `Using ${ingredients.length} ingredients from Todoist:`,
      ingredients
    );

    // Call the OpenAI service to get recipe recommendations
    const recommendations = await callOpenAIApi(ingredients);
    return recommendations;
  } catch (error: any) {
    console.error("Error getting recipe recommendations from Todoist:", error);
    if (error.message.includes("Matinventarie")) {
      throw new Error(`Todoist-fel: ${error.message}`);
    } else {
      throw error;
    }
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
