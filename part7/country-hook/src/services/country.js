import axios from "axios";
const baseURL = `https://studies.cs.helsinki.fi/restcountries`;
const get = async (name) => {
  console.log(`${baseURL}/api/name/${name}`);
  const response = await axios.get(`${baseURL}/api/name/${name}`);
  return response.data;
};

export default { get };
