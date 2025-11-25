const API_BASE_URL =  'http://localhost:5000/api';

class ApiService {
  async searchMeals(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/meals/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data;
    } catch (error) {
      throw new Error(`Failed to search meals: ${error.message}`);
    }
  }

  async getMealById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/meals/${id}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data;
    } catch (error) {
      throw new Error(`Failed to fetch meal: ${error.message}`);
    }
  }

  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/meals/categories`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  async getMealsByCategory(category) {
    try {
      const response = await fetch(`${API_BASE_URL}/meals/category/${encodeURIComponent(category)}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data;
    } catch (error) {
      throw new Error(`Failed to fetch meals by category: ${error.message}`);
    }
  }

  async getRandomMeal() {
    try {
      const response = await fetch(`${API_BASE_URL}/meals/random`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data;
    } catch (error) {
      throw new Error(`Failed to fetch random meal: ${error.message}`);
    }
  }
}

export default new ApiService();
