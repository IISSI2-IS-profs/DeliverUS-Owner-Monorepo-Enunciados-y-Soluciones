// BEGIN SOLUTION
// Added patch helper
import { get, post, put, destroy, patch } from './helpers/ApiRequestsHelper'
// END SOLUTION

function getDetail(id) {
  return get(`products/${id}`)
}

function getProductCategories() {
  return get('productCategories')
}

function create(data) {
  return post('/products/', data)
}

function update(id, data) {
  return put(`products/${id}`, data)
}

function remove(id) {
  return destroy(`products/${id}`)
}

// BEGIN SOLUTION
// Enpoint for toggling promote property 
function promote(id) {
  return patch(`products/${id}/togglepromoted`)
}

// Added promote endpoint handler
export { getDetail, getProductCategories, create, update, remove, promote }
// END SOLUTION
