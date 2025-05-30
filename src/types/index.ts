export interface Ingredient {
  id: number;
  name: string;
  category: string;
}

export interface IngredientsData {
  ingredients: Ingredient[];
}

export interface Dish {
  name: string;
  description: string;
  ingredients: string[];
}

export interface AIResponse {
  dishes: Dish[];
}
