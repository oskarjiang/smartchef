import React, { useState, useEffect } from "react";
import { getRecipeRecommendations } from "../services/recipeService";
import { Container, Typography, Box, Alert } from "@mui/material";
import { Dish } from "../types";
import "./SmartChef.css";

const SmartChef: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recommendedDishes, setRecommendedDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Fetch ingredients from JSON file
  useEffect(() => {
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
  }, []);
  // Get recipe recommendations using all ingredients from the JSON file
  const getRecommendations = async () => {
    if (ingredients.length === 0) {
      setError("Inga ingredienser tillgängliga");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dishes = await getRecipeRecommendations(ingredients);
      setRecommendedDishes(dishes);

      if (dishes.length === 0) {
        setError("Inga recept hittades med tillgängliga ingredienser");
      }
    } catch (err) {
      setError("Kunde inte hämta receptrekommendationer");
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
          {" "}
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
                Söker efter recept för dina ingredienser...
              </p>
            </div>
          )}{" "}
          {error && (
            <Alert severity="error" sx={{ my: 2 }} className="error">
              {error}
            </Alert>
          )}
          {recommendedDishes.length === 0 && (
            <div className="button-container">
              <button
                className="recommend-button"
                onClick={getRecommendations}
                disabled={loading || ingredients?.length === 0}
              >
                {loading
                  ? "Hämtar rekommendationer..."
                  : "Hämta receptrekommendationer"}
              </button>
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default SmartChef;
