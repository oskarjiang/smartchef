import { Ingredient, Dish } from "../types";
import OpenAI from "openai";

// API call to OpenAI
export const callOpenAIApi = async (
  ingredients: Ingredient[]
): Promise<Dish[]> => {
  try {
    console.log("Calling OpenAI API with ingredients:", ingredients);

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OpenAI API key is missing. Please check your .env file."
      );
    }

    // Initialize the OpenAI client with the API key
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Required for browser-side usage
    });

    // Call the OpenAI API using the official client
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Du är en hjälpsam matlagningsassistent som föreslår rätter baserat på tillgängliga ingredienser. Svara bara på svenska.",
        },
        {
          role: "user",
          content: `Jag har dessa ingredienser: ${ingredients.join(", ")}. 
                   Föreslå tre rätter jag kan laga. 
                   Returnera endast en JSON-array med 3 objekt som innehåller: 
                   name (string), description (string) och ingredients (array med strängar).
                   Mycket viktigt: Svara med ren JSON utan markdown-formatering`,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("OpenAI response is empty");
    }

    try {
      // Parse the returned JSON
      const dishes = JSON.parse(content);
      return dishes;
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", content);
      throw new Error("Invalid response format from OpenAI");
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to get recipes from OpenAI");
  }
};
