import { Dish } from "../types";

// Interfaces for Todoist API responses
interface TodoistProject {
  id: string;
  name: string;
}

interface TodoistTask {
  id: string;
  content: string;
  project_id: string;
}

// Function to fetch items from Todoist's "Matinventarie" project
export const getTodoistItems = async (): Promise<string[]> => {
  try {
    // Check if the Todoist API key exists
    const apiKey = process.env.REACT_APP_TODOIST_API_KEY;

    if (!apiKey) {
      console.error("Todoist API key is missing. Please check your .env file.");
      throw new Error("Todoist API key is missing");
    } // Get all projects to find the "Matinventarie" project ID
    console.log("Fetching Todoist projects with API token...");
    const projectsResponse = await fetch(
      "https://api.todoist.com/rest/v2/projects",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!projectsResponse.ok) {
      const errorText = await projectsResponse.text();
      throw new Error(
        `Failed to fetch projects: ${projectsResponse.status} ${projectsResponse.statusText}. Details: ${errorText}`
      );
    }

    const projects: TodoistProject[] = await projectsResponse.json();
    console.log("Fetched projects:", projects.map((p) => p.name).join(", "));

    const matinventarieProject = projects.find(
      (project) => project.name === "Matinventarie"
    );

    if (!matinventarieProject) {
      throw new Error(
        "Project 'Matinventarie' not found in your Todoist account"
      );
    }

    console.log(
      `Found Matinventarie project with ID: ${matinventarieProject.id}`
    ); // Get active tasks (ingredients) from the "Matinventarie" project
    console.log(
      `Fetching tasks from project ${matinventarieProject.name} (ID: ${matinventarieProject.id})...`
    );
    const tasksResponse = await fetch(
      `https://api.todoist.com/rest/v2/tasks?project_id=${matinventarieProject.id}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!tasksResponse.ok) {
      const errorText = await tasksResponse.text();
      throw new Error(
        `Failed to fetch tasks: ${tasksResponse.status} ${tasksResponse.statusText}. Details: ${errorText}`
      );
    }

    const tasks: TodoistTask[] = await tasksResponse.json();

    // Extract only the task content (ingredient names)
    const ingredients = tasks.map((task) => task.content);

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
