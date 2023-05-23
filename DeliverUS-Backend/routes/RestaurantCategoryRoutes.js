'use strict'
const RestaurantCategoryController = require('../controllers/RestaurantCategoryController')

module.exports = (options) => {
  const app = options.app

  app.route('/restaurantCategories')
    .get(RestaurantCategoryController.indexRestaurantCategory)
}
