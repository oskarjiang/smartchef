import React, { useState, useEffect } from "react";
import { Dish } from "../types";
import { getRecipeRecommendations } from "../services/recipeService";

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
    <div className="smart-chef">
      <h1>Smart Kock</h1>
      {/* Recipe Recommendations */}
      <div className="recommendations-section">
        {recommendedDishes.length > 0 ? (
          <>
            <h2>Receptrekommendationer</h2>
            <div className="dishes-list">
              {" "}
              {recommendedDishes.map((dish, index) => (
                <div key={index} className="dish-card">
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <div className="dish-ingredients">
                    <strong>Ingredienser:</strong>
                    <ul>
                      {dish.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                  {dish.instructions && dish.instructions.length > 0 && (
                    <div className="dish-instructions">
                      <strong>Instruktioner:</strong>
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
          </>
        ) : (
          <></>
        )}

        {loading && <div className="loading">Laddar rekommendationer...</div>}
        {error && <div className="error">{error}</div>}

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
    </div>
  );
};

export default SmartChef;
