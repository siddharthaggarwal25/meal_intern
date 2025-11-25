const express = require('express');
const mealController = require('../controllers/mealController');

const createMealRoutes = (mealService) => {
  const router = express.Router();
  const controller = mealController(mealService);

  router.get('/search', controller.search);
  router.get('/categories', controller.getCategories);
  router.get('/category/:category', controller.getMealsByCategory);
  router.get('/random', controller.getRandom);
  router.get('/:id', controller.getById);

  return router;
};

module.exports = createMealRoutes;
