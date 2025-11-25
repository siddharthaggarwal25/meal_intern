const mealController = (mealService) => {
  return {
    async search(req, res, next) {
      try {
        const { query } = req.query;

        if (!query) {
          return res.status(400).json({
            success: false,
            message: 'Search query is required',
          });
        }

        const meals = await mealService.searchMealByName(query);
        res.json({
          success: true,
          data: meals,
        });
      } catch (error) {
        next(error);
      }
    },

    async getById(req, res, next) {
      try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).json({
            success: false,
            message: 'Meal ID is required',
          });
        }

        const meal = await mealService.getMealById(id);
        res.json({
          success: true,
          data: meal,
        });
      } catch (error) {
        next(error);
      }
    },

    async getRandom(req, res, next) {
      try {
        const meal = await mealService.getRandomMeal();
        res.json({
          success: true,
          data: meal,
        });
      } catch (error) {
        next(error);
      }
    },

    async getCategories(req, res, next) {
      try {
        const categories = await mealService.getCategories();
        res.json({
          success: true,
          data: categories,
        });
      } catch (error) {
        next(error);
      }
    },

    async getMealsByCategory(req, res, next) {
      try {
        const { category } = req.params;

        if (!category) {
          return res.status(400).json({
            success: false,
            message: 'Category is required',
          });
        }

        const meals = await mealService.getMealsByCategory(category);
        res.json({
          success: true,
          data: meals,
        });
      } catch (error) {
        next(error);
      }
    },
  };
};

module.exports = mealController;
