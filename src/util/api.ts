import axios from 'axios'

export const api = axios.create({
  baseURL: '//localhost:3000/api/v1',
  timeout: 1000,
  //   headers: { 'X-Custom-Header': 'foobar' },
})
