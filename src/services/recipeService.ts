import { Dish } from "../types";
import { callOpenAIApi } from "./openAIService";
import { getTodoistItems } from "./todoistService";

// Function to get recipe recommendations based on ingredients from Todoist
export const getRecipeRecommendationsFromTodoist = async (): Promise<
  Dish[]
> => {
  const ingredients = await getTodoistItems();

  if (ingredients.length === 0) {
    throw new Error("Inga ingredienser hittades");
  }

  const recommendations = await callOpenAIApi(ingredients);
  return recommendations;
};
