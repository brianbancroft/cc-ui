import axios from 'axios'

export const api = axios.create({
  baseURL: `${import.meta.env['VITE_API_SERVER']}/api/v1`,
  timeout: 1000,
  //   headers: { 'X-Custom-Header': 'foobar' },
})
