import { Dish } from "../types";
import OpenAI from "openai";
import testData from "../test_data.json";

// API call to OpenAI
export const callOpenAIApi = async (ingredients: string[]): Promise<Dish[]> => {
  try {
    // Debug environment variables
    console.log("Environment variables:", {
      useTestData: process.env.REACT_APP_USE_TEST_DATA,
      apiKey: process.env.REACT_APP_OPENAI_API_KEY ? "[REDACTED]" : "undefined",
      allEnvVars: Object.keys(process.env).filter((key) =>
        key.startsWith("REACT_APP_")
      ),
    });
    // Check if we should use test data instead of calling the API
    if (process.env.REACT_APP_USE_TEST_DATA === "true") {
      console.log("Using test data instead of calling OpenAI API");
      console.log("Test data available:", Array.isArray(testData));
      return testData as Dish[];
    }

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
      model: "gpt-4o",
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
                   Exkludera bakverk och desserter.
                   Försök föreslå minst en rätt baserad på ris.
                   Försök föreslå minst en rätt baserad på pasta.
                   En portion pasta är 85g, en portion ris är 60g.
                   I description, inkludera även en länk till den recptet som du inspirerats av.
                   Ge recepten för fyra portioner.
                   För ingredients som är del av rätten, inkludera mängd
                   Returnera endast en JSON-array med 3 objekt som innehåller: 
                   name (string), description (string), ingredients (array med strängar), och instructions (array med strängar för steg-för-steg instruktioner).
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
