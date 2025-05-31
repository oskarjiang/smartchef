import { TodoistApi } from "@doist/todoist-api-typescript";
import { Dish } from "../types";

// Function to fetch items from Todoist's "Matinventarie" project
export const getTodoistItems: () => Promise<string[]> = async () => {
  try {
    // Check if the Todoist API key exists
    const apiKey = process.env.REACT_APP_TODOIST_API_KEY;

    if (!apiKey) {
      console.error("Todoist API key is missing. Please check your .env file.");
      throw new Error("Todoist API key is missing");
    }

    // Initialize the Todoist API client
    const todoist = new TodoistApi(apiKey);

    // Get all projects to find the "Matinventarie" project ID
    const projects = await todoist.getProjects();
    const matinventarieProject = projects.results.find(
      (project) => project.name === "Matinventarie"
    );

    if (!matinventarieProject) {
      throw new Error(
        "Project 'Matinventarie' not found in your Todoist account"
      );
    }

    // Get active tasks (ingredients) from the "Matinventarie" project
    const tasks = await todoist.getTasks({
      projectId: matinventarieProject.id,
    });

    // Extract only the task content (ingredient names)
    const ingredients = tasks.results.map((task) => task.content);

    console.log(
      `Fetched ${ingredients.length} ingredients from Todoist project 'Matinventarie'`
    );
    return ingredients;
  } catch (error) {
    console.error("Error fetching Todoist items:", error);
    throw error;
  }
};

// Convert Todoist items to recipe format if needed in the future
export const convertTodoistItemsToDishes = (items: string[]): Dish[] => {
  // This function could be implemented later if needed
  // For now, we're just using the Todoist items as ingredients input
  return [];
};
