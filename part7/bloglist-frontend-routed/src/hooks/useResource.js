import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

const useResource = baseUrl => {
  let token = null
  const [resources, setResources] = useState([])

  const getAll = useCallback(async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }, [baseUrl])

  const create = async newObject => {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    setResources(resources.concat(response.data))
  }

  useEffect(() => {
    getAll()
  }, [getAll])

  const service = {
    getAll,
    create
  }

  return [resources, service]
}

export default useResource
