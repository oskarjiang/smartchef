interface TodoistTask {
  id: string;
  content: string;
  project_id: string;
  parent_id: string | null;
}

// Function to fetch items from Todoist's "Matinventarie" project
export const getTodoistItems = async (): Promise<string[]> => {
  // Check if the Todoist API key exists
  const apiKey = process.env.REACT_APP_TODOIST_API_KEY;
  if (!apiKey) {
    throw new Error("Todoist API nyckel saknas");
  }

  // Check if the Todoist project ID exists
  const projectId = process.env.REACT_APP_TODOIST_PROJECT_ID;
  if (!projectId) {
    throw new Error("Todoist projekt ID saknas");
  }

  const tasksResponse = await fetch(
    `https://api.todoist.com/rest/v2/tasks?project_id=${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  if (!tasksResponse.ok) {
    const errorText = await tasksResponse.text();
    throw new Error(
      `Kunde inte hämta ingredienser från Todoist: ${tasksResponse.status} ${tasksResponse.statusText}. Details: ${errorText}`
    );
  }

  const tasks: TodoistTask[] = await tasksResponse.json();

  // Extract only the task content (ingredient names)
  const ingredients = tasks
    .filter((task) => task.parent_id !== null)
    .map((task) => task.content);

  console.log(
    `Hämtade ${ingredients.length} ingredienser från Todoist projekt`
  );
  return ingredients;
};
