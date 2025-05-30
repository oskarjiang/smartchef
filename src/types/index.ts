export interface Ingredient {
  id: number;
  name: string;
  category: string;
  quantity: string;
}

export interface Dish {
  name: string;
  description: string;
  ingredients: string[];
}

export interface AIResponse {
  dishes: Dish[];
}
