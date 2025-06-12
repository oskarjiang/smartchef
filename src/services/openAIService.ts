import { Dish } from "../types";
import OpenAI from "openai";

// API call to OpenAI
export const callOpenAIApi = async (ingredients: string[]): Promise<Dish[]> => {
  try {
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
      throw new Error("Svaret från OpenAI är tomt");
    }
    try {
      const dishes = JSON.parse(content);
      return dishes;
    } catch (parseError) {
      throw new Error("Ogiltigt svarformat från OpenAI");
    }
  } catch (error) {
    throw new Error("Misslyckades med att hämta recept från OpenAI");
  }
};
