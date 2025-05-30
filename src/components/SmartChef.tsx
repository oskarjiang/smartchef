import React, { useState, useEffect } from "react";
import { getRecipeRecommendations } from "../services/recipeService";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Dish } from "../types";

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        SmartChef
      </Typography>

      {/* Recipe Recommendations */}
      <Box sx={{ mb: 4 }}>
        {recommendedDishes.length > 0 && (
          <>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2 }}>
              Receptrekommendationer
            </Typography>
            <Grid container spacing={3}>
              {recommendedDishes.map((dish, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {dish.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dish.description}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", mt: 2 }}
                      >
                        Ingredienser:
                      </Typography>
                      <List dense>
                        {dish.ingredients.map((ing, i) => (
                          <ListItem key={i} sx={{ py: 0.5 }}>
                            <ListItemText primary={ing} />
                          </ListItem>
                        ))}
                      </List>

                      {dish.instructions && dish.instructions.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Instruktioner:
                          </Typography>
                          <List dense sx={{ listStyleType: "decimal", pl: 4 }}>
                            {dish.instructions.map((step, i) => (
                              <ListItem
                                key={i}
                                sx={{ display: "list-item", py: 0.5 }}
                              >
                                <ListItemText primary={step} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={getRecommendations}
            disabled={loading || ingredients?.length === 0}
            size="large"
          >
            {loading
              ? "Hämtar rekommendationer..."
              : "Hämta receptrekommendationer"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SmartChef;
