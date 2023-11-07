'use strict'
const { Op } = require('sequelize')
const models = require('../models')
const Restaurant = models.Restaurant
const Order = models.Order

module.exports = {
  checkRestaurantOwnership: async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.restaurantId)
      if (req.user.id === restaurant.userId) {
        return next()
      }
      return res.status(403).send('Not enough privileges. This entity does not belong to you')
    } catch (err) {
      return res.status(500).send(err)
    }
  },
  // TODO: Validación de la operación
  checkValidStatusChange: async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.restaurantId)
      const count = await Order.count({
        where: {
          restaurantId: req.params.restaurantId,
          deliveredAt: { [Op.is]: null }
        }
      })
      if ((restaurant.status === 'online' || restaurant.status === 'offline') && count === 0) {
        return next()
      }
      return res.status(403).send('Not valid status change. This entity is closed or temporaly closed or has incomplete orders (not deliverAt valid value).')
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}
