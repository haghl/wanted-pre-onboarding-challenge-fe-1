import axios from 'axios'
import router from '@/router/router'

// API 인스턴스 생성
const API = axios.create({
  baseURL: `http://localhost:8080`,
  withCredentials: true,
})

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    const data = config

    if (accessToken || accessToken !== 'undefined') {
      // eslint-disable-next-line no-param-reassign
      data.headers = {
        Accept: '*/*',
        'Content-Type': 'application/json',
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      data.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Accept: '*/*',
      }
    }

    return data
  },
  (err) => {
    console.log('api보낼거 오류', err.response.data)
    return Promise.reject(err)
  }
)

API.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    alert(`오류발생! ${err.response.data.details}`)
    if (err.response.status === 400) router.navigate('/login', { replace: true })
    return Promise.reject(err)
  }
)

export default API
