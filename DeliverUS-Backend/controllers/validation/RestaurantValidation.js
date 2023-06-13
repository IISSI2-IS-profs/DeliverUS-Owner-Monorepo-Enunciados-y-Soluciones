const { check } = require('express-validator')
const { checkFileIsImage, checkFileMaxSize } = require('./FileValidationHelper')
const { Restaurant } = require('../../models')
const { Op } = require('sequelize')
const maxFileSize = 2000000 // around 2Mb

const checkDiscountCodeNotRepeated = async (discountCode, ownerId, restaurantId) => {
  const whereClauses = {
    userId: ownerId,
    discountCode
  }
  if (restaurantId) {
    whereClauses.id =
    {
      [Op.ne]: restaurantId
    }
  }
  const numberRestaurantsWithSameDiscountCode = await Restaurant.count({
    where: whereClauses
  })
  if (numberRestaurantsWithSameDiscountCode >= 1) {
    throw new Error('Restaurant discount codes cannot repeat among restaurants of the same owner.')
  }
  return true
}

module.exports = {
  create: [
    check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('description').optional({ nullable: true, checkFalsy: true }).isString().trim(),
    check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('postalCode').exists().isString().isLength({ min: 1, max: 255 }),
    check('url').optional({ nullable: true, checkFalsy: true }).isString().isURL().trim(),
    check('shippingCosts').exists().isFloat({ min: 0 }).toFloat(),
    check('email').optional({ nullable: true, checkFalsy: true }).isString().isEmail().trim(),
    check('phone').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 255 }).trim(),
    check('restaurantCategoryId').exists({ checkNull: true }).isInt({ min: 1 }).toInt(),
    check('userId').not().exists(),
    check('discountCode').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 10 }).trim(),
    check('discount').optional({ nullable: true, checkFalsy: true }).isFloat({ min: 1, max: 99 }).toFloat(),
    check('discountCode').custom(async (value, { req }) => {
      if (value) {
        return await checkDiscountCodeNotRepeated(value, req.user.id)
      }
      return true
    }).withMessage('Restaurant discount codes cannot repeat among restaurants of the same owner.'),
    check('heroImage').custom((value, { req }) => {
      return checkFileIsImage(req, 'heroImage')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('heroImage').custom((value, { req }) => {
      return checkFileMaxSize(req, 'heroImage', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
    check('logo').custom((value, { req }) => {
      return checkFileIsImage(req, 'logo')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('logo').custom((value, { req }) => {
      return checkFileMaxSize(req, 'logo', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB')
  ],
  update: [
    check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('description').optional({ nullable: true, checkFalsy: true }).isString().trim(),
    check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),
    check('postalCode').exists().isString().isLength({ min: 1, max: 255 }),
    check('url').optional({ nullable: true, checkFalsy: true }).isString().isURL().trim(),
    check('shippingCosts').exists().isFloat({ min: 0 }).toFloat(),
    check('email').optional({ nullable: true, checkFalsy: true }).isString().isEmail().trim(),
    check('phone').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 255 }).trim(),
    check('restaurantCategoryId').exists({ checkNull: true }).isInt({ min: 1 }).toInt(),
    check('userId').not().exists(),
    check('discountCode').optional({ nullable: true, checkFalsy: true }).isString().isLength({ min: 1, max: 10 }).trim(),
    check('discount').optional({ checkFalsy: true }).isFloat({ min: 1, max: 99 }).toFloat(),
    check('discountCode').custom(async (value, { req }) => {
      if (value) {
        return await checkDiscountCodeNotRepeated(value, req.user.id, req.params.restaurantId)
      }
      return true
    }).withMessage('Restaurant discount codes cannot repeat among restaurants of the same owner.'),
    check('heroImage').custom((value, { req }) => {
      return checkFileIsImage(req, 'heroImage')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('heroImage').custom((value, { req }) => {
      return checkFileMaxSize(req, 'heroImage', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB'),
    check('logo').custom((value, { req }) => {
      return checkFileIsImage(req, 'logo')
    }).withMessage('Please upload an image with format (jpeg, png).'),
    check('logo').custom((value, { req }) => {
      return checkFileMaxSize(req, 'logo', maxFileSize)
    }).withMessage('Maximum file size of ' + maxFileSize / 1000000 + 'MB')
  ]
}
