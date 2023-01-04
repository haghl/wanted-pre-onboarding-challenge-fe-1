import API from '@/utils/API'

const headers = { 'Content-Type': 'application/json' }

export type UserProp = { email: string; password: string }

// 회원가입
export const postSignUp = (data: UserProp) => {
  const url = '/users/create'
  const config = {
    headers,
  }
  return API.post(url, data, config)
}

// 로그인
export const postLogin = (data: UserProp) => {
  const url = '/users/login'
  const config = {
    headers,
  }
  return API.post(url, data, config)
}
