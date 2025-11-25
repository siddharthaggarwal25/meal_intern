const axios = require('axios');

const MEALDB_API_URL =  'https://www.themealdb.com/api/json/v1/1';

class MealService {
  constructor(cache) {
    this.cache = cache;
    this.apiClient = axios.create({
      baseURL: MEALDB_API_URL,
      timeout: 10000,
    });
  }

  async searchMealByName(name) {
    const cacheKey = `search_meal_${name}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await this.apiClient.get(`/search.php?s=${name}`);
      const meals = response.data.meals || [];
      
      const result = this._formatMeals(meals);
      this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      throw new Error(`Failed to search meals: ${error.message}`);
    }
  }

  async getMealById(id) {
    const cacheKey = `meal_${id}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await this.apiClient.get(`/lookup.php?i=${id}`);
      const meal = response.data.meals ? response.data.meals[0] : null;
      
      if (!meal) {
        throw new Error('Meal not found');
      }

      const result = this._formatMealDetail(meal);
      this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch meal details: ${error.message}`);
    }
  }

  async getCategories() {
    const cacheKey = 'categories';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await this.apiClient.get('/categories.php');
      const categories = response.data.categories || [];
      
      const result = categories.map(cat => ({
        id: cat.idCategory,
        name: cat.strCategory,
        description: cat.strCategoryDescription,
        thumbnail: cat.strCategoryThumb,
      }));
      
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  async getMealsByCategory(category) {
    const cacheKey = `category_${category}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await this.apiClient.get(`/filter.php?c=${category}`);
      const meals = response.data.meals || [];
      
      const result = this._formatMeals(meals);
      this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch meals by category: ${error.message}`);
    }
  }

  async getRandomMeal() {
    try {
      const response = await this.apiClient.get('/random.php');
      const meal = response.data.meals ? response.data.meals[0] : null;
      
      if (!meal) {
        throw new Error('Random meal not found');
      }

      return this._formatMealDetail(meal);
    } catch (error) {
      throw new Error(`Failed to fetch random meal: ${error.message}`);
    }
  }

  _formatMeals(meals) {
    return meals.map(meal => ({
      id: meal.idMeal,
      name: meal.strMeal,
      thumbnail: meal.strMealThumb,
      category: meal.strCategory,
    }));
  }

  _formatMealDetail(meal) {
    const ingredients = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }

    return {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      thumbnail: meal.strMealThumb,
      instructions: meal.strInstructions,
      tags: meal.strTags ? meal.strTags.split(',').map(t => t.trim()) : [],
      youtube: meal.strYoutube || '',
      ingredients,
    };
  }
}

module.exports = MealService;
