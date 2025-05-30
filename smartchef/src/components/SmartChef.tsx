import React, { useState, useEffect } from "react";
import { Ingredient, IngredientsData, Dish } from "../types";
import { getRecipeRecommendations } from "../services/recipeService";

const SmartChef: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [recommendedDishes, setRecommendedDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  // Toggle ingredient selection
  const toggleIngredient = (ingredient: Ingredient) => {
    if (selectedIngredients.some((item) => item.id === ingredient.id)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item.id !== ingredient.id)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // Get recipe recommendations
  const getRecommendations = async () => {
    if (selectedIngredients.length === 0) {
      setError("Please select at least one ingredient");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dishes = await getRecipeRecommendations(selectedIngredients);
      setRecommendedDishes(dishes);

      if (dishes.length === 0) {
        setError("No recipes found with selected ingredients");
      }
    } catch (err) {
      setError("Failed to get recipe recommendations");
      console.error("Error getting recommendations:", err);
    } finally {
      setLoading(false);
    }
  };
  // Filter ingredients based on search term
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group ingredients by category
  const groupedIngredients: { [key: string]: Ingredient[] } = {};
  filteredIngredients.forEach((ingredient) => {
    if (!groupedIngredients[ingredient.category]) {
      groupedIngredients[ingredient.category] = [];
    }
    groupedIngredients[ingredient.category].push(ingredient);
  });

  return (
    <div className="smart-chef">
      <h1>Smart Chef</h1>

      {/* Ingredients Selection */}
      <div className="ingredients-section">
        <h2>Select Your Ingredients</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="selected-count">
          Selected: {selectedIngredients.length} ingredient
          {selectedIngredients.length !== 1 ? "s" : ""}
        </div>

        {Object.entries(groupedIngredients).map(
          ([category, categoryIngredients]) => (
            <div key={category} className="ingredient-category">
              <h3>{category}</h3>
              <div className="ingredients-list">
                {categoryIngredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className={`ingredient-item ${
                      selectedIngredients.some(
                        (item) => item.id === ingredient.id
                      )
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => toggleIngredient(ingredient)}
                  >
                    {ingredient.name}
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {filteredIngredients.length === 0 && (
          <div className="no-ingredients">
            No ingredients found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Recipe Recommendations */}
      <div className="recommendations-section">
        <h2>Recipe Recommendations</h2>
        {recommendedDishes.length > 0 ? (
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
        ) : (
          <div className="no-recommendations">
            {!error &&
              !loading &&
              "Get recommendations based on your ingredients"}
          </div>
        )}

        {loading && <div className="loading">Loading recommendations...</div>}
        {error && <div className="error">{error}</div>}

        <button
          className="recommend-button"
          onClick={getRecommendations}
          disabled={loading || selectedIngredients.length === 0}
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
