import React, { useState, useEffect } from "react";
import { Ingredient, IngredientsData, Dish } from "../types";
import { getRecipeRecommendations } from "../services/recipeService";

const SmartChef: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recommendedDishes, setRecommendedDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch ingredients from JSON file
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch("/ingredients.json");
        const data: IngredientsData = await response.json();
        setIngredients(data.ingredients);
      } catch (err) {
        setError("Failed to load ingredients");
        console.error("Error loading ingredients:", err);
      }
    };

    fetchIngredients();
  }, []);

  // Get recipe recommendations using all ingredients from the JSON file
  const getRecommendations = async () => {
    if (ingredients.length === 0) {
      setError("No ingredients available");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dishes = await getRecipeRecommendations(ingredients);
      setRecommendedDishes(dishes);

      if (dishes.length === 0) {
        setError("No recipes found with available ingredients");
      }
    } catch (err) {
      setError("Failed to get recipe recommendations");
      console.error("Error getting recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Group ingredients by category for display
  const groupedIngredients: { [key: string]: Ingredient[] } = {};
  ingredients.forEach((ingredient) => {
    if (!groupedIngredients[ingredient.category]) {
      groupedIngredients[ingredient.category] = [];
    }
    groupedIngredients[ingredient.category].push(ingredient);
  });

  return (
    <div className="smart-chef">
      <h1>Smart Chef</h1>
      {/* Recipe Recommendations */}
      <div className="recommendations-section">
        {recommendedDishes.length > 0 ? (
          <>
            <h2>Recipe Recommendations</h2>
            <div className="dishes-list">
              {recommendedDishes.map((dish, index) => (
                <div key={index} className="dish-card">
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <div className="dish-ingredients">
                    <strong>Ingredients:</strong>
                    <ul>
                      {dish.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}

        {loading && <div className="loading">Loading recommendations...</div>}
        {error && <div className="error">{error}</div>}

        <button
          className="recommend-button"
          onClick={getRecommendations}
          disabled={loading || ingredients.length === 0}
        >
          {loading
            ? "Getting Recommendations..."
            : "Get Recipe Recommendations"}
        </button>
      </div>
    </div>
  );
};

export default SmartChef;
