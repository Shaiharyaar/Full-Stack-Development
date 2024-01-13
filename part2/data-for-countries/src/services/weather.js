import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const baseURL = `https://api.openweathermap.org/data/3.0/onecall`
const get = async (lat, lon) => {
  const response = await axios.get(
    `${baseURL}?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${api_key}`
  )
  return response
}

export default { get }
