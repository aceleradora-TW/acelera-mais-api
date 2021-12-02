import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://beta-acelera-mais-api.herokuapp.com/'
})
