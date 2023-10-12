import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (newObject, blogId) => {
  const fullUrl = `${baseUrl}/${blogId}`
  const response = await axios.put(fullUrl, newObject)
  return response.data
}

const deleteBlog = async blogId => {
  const fullUrl = `${baseUrl}/${blogId}`
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(fullUrl, config)
}

export default { setToken, getAll, create, like, deleteBlog }
