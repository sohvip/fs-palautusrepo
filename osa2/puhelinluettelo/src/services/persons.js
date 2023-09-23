import axios from 'axios'

let baseUrl = '/api/persons'
let deploymentUrl = 'http://localhost:3001/api/persons'

/*const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}*/

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
    .then((response) => response.data)
    .catch((error) => {
      alert('URL not connecting...changing to another')
      baseUrl = deploymentUrl
      return axios.get(baseUrl).then((response) => response.data)
    })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default { getAll, create, remove, update }