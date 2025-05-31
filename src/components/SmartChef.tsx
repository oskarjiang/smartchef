import React, { useState, useEffect } from "react";
import {
  getRecipeRecommendations,
  getRecipeRecommendationsFromTodoist,
} from "../services/recipeService";
import { Container, Typography, Box, Alert } from "@mui/material";
import { Dish } from "../types";
import "./SmartChef.css";

const SmartChef: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recommendedDishes, setRecommendedDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [todoistConfigured, setTodoistConfigured] = useState<boolean>(false);

  // Determine whether to use local ingredients from env variable (defaulting to Todoist)
  // Placed outside of useEffect to avoid dependency issues
  const useLocalIngredients =
    process.env.REACT_APP_USE_LOCAL_INGREDIENTS === "true";

  // Check if Todoist API key is configured
  useEffect(() => {
    const todoistApiKey = process.env.REACT_APP_TODOIST_API_KEY;
    const isConfigured =
      !!todoistApiKey && todoistApiKey !== "your_todoist_api_token_here";
    setTodoistConfigured(isConfigured);

    if (!isConfigured && !useLocalIngredients) {
      console.warn(
        "Todoist API key is not properly configured. Set REACT_APP_TODOIST_API_KEY in your .env file to your Todoist API token or set REACT_APP_USE_LOCAL_INGREDIENTS=true."
      );
    }
  }, []); // No dependencies needed as useLocalIngredients is constant

  // Fetch ingredients from JSON file if using local ingredients
  useEffect(() => {
    // Only fetch from JSON if we're using local ingredients or if Todoist isn't configured
    if (useLocalIngredients || !todoistConfigured) {
      const fetchIngredients = async () => {
        try {
          const response = await fetch("/ingredients.json");
          const data: string[] = await response.json();
          setIngredients(data);
        } catch (err) {
          setError("Kunde inte ladda ingredienser");
          console.error("Error loading ingredients:", err);
        }
      };

      fetchIngredients();
    }
  }, [todoistConfigured]); // useLocalIngredients is constant and doesn't need to be in the dependency array

  // Get recipe recommendations using ingredients
  const getRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      let dishes: Dish[];

      if (!useLocalIngredients && todoistConfigured) {
        // Use Todoist as the ingredient source
        dishes = await getRecipeRecommendationsFromTodoist();
      } else {
        // Use local ingredients as fallback
        if (ingredients.length === 0) {
          setError("Inga ingredienser tillgängliga");
          setLoading(false);
          return;
        }
        dishes = await getRecipeRecommendations(ingredients);
      }

      setRecommendedDishes(dishes);

      if (dishes.length === 0) {
        setError("Inga recept hittades med tillgängliga ingredienser");
      }
    } catch (err: any) {
      setError(
        `Kunde inte hämta receptrekommendationer: ${err.message || "Okänt fel"}`
      );
      console.error("Error getting recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Container maxWidth="lg" sx={{ py: 4 }} className="smart-chef">
        <div className="page-header">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            SmartChef
          </Typography>
        </div>

        {/* Recipe Recommendations */}
        <Box sx={{ mb: 4 }}>
          {recommendedDishes.length > 0 && (
            <div className="recommendations-section fade-in">
              <div className="dishes-list">
                {recommendedDishes.map((dish, index) => (
                  <div
                    key={index}
                    className="dish-card"
                    style={{ "--animation-order": index + 1 } as any}
                  >
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>

                    <div className="dish-ingredients">
                      <h4>Ingredienser:</h4>
                      <ul>
                        {dish.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    {dish.instructions && dish.instructions.length > 0 && (
                      <div className="dish-instructions">
                        <h4>Instruktioner:</h4>
                        <ol>
                          {dish.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {loading && (
            <div className="loading-container">
              <div className="cooking-animation">
                <div className="loading-spinner"></div>
              </div>
              <p className="cooking-text">
                Söker efter recept för{" "}
                {useLocalIngredients
                  ? "dina lokala ingredienser"
                  : "dina ingredienser"}
                ...
              </p>
            </div>
          )}{" "}
          {error && (
            <Alert severity="error" sx={{ my: 2 }} className="error">
              {error}
            </Alert>
          )}
          {recommendedDishes.length === 0 && (
            <>
              <div className="button-container">
                <button
                  className="recommend-button"
                  onClick={getRecommendations}
                  disabled={
                    loading || (!todoistConfigured && ingredients?.length === 0)
                  }
                >
                  {loading
                    ? "Hämtar rekommendationer..."
                    : `Hämta receptrekommendationer${
                        useLocalIngredients ? " från lokal lista" : ""
                      }`}
                </button>
              </div>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default SmartChef;
