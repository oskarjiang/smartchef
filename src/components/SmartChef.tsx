import React, { useState } from "react";
import { getRecipeRecommendationsFromTodoist } from "../services/recipeService";
import { Container, Typography, Box } from "@mui/material";
import { Dish } from "../types";
import "./SmartChef.css";

const SmartChef: React.FC = () => {
  const [recommendedDishes, setRecommendedDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Get recipe recommendations using ingredients
  const getRecommendations = async () => {
    setLoading(true);
    const dishes = await getRecipeRecommendationsFromTodoist();
    setRecommendedDishes(dishes);
    setLoading(false);
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
                Söker efter recept för dina ingredienser...
              </p>
            </div>
          )}
          {recommendedDishes.length === 0 && (
            <>
              <div className="button-container">
                <button
                  className="recommend-button"
                  onClick={getRecommendations}
                  disabled={loading}
                >
                  {loading ? "Hämtar rekommendationer..." : `Hämta recept`}
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
