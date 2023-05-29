'use strict'
const RestaurantCategoryController = require('../controllers/RestaurantCategoryController')
// SOLUCION
const RestaurantCategoryValidation = require('../controllers/validation/RestaurantCategoryValidation')

module.exports = (options) => {
  const app = options.app
  // SOLUCION
  const middlewares = options.middlewares

  app.route('/restaurantCategories')
    .get(RestaurantCategoryController.indexRestaurantCategory)
    // SOLUCION
    .post(
      middlewares.isLoggedIn,
      middlewares.hasRole('owner'),
      RestaurantCategoryValidation.create,
      middlewares.handleValidation,
      RestaurantCategoryController.create)
}
