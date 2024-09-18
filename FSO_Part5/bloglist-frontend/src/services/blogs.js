import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const getSingle = (id) => {
  const request = axios.get(`${ baseUrl }/${id}`)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const deleteSingle = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${ baseUrl }/${id}`, config)
  return request.then(response =>  response.data)
}

export default { getAll, getSingle, create, update, setToken, deleteSingle }