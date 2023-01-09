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

// 투두 리스트 불러오기
export const getToDoList = () => {
  const url = '/todos'
  const config = {
    headers,
  }
  return API.get(url, config)
}

export type TodoProp = { title: string; content: string }

// todo 생성
export const postCreateToDo = (data: TodoProp) => {
  const url = '/todos'
  const config = {
    headers,
  }
  return API.post(url, data, config)
}

// todo 수정
export const postEditToDo = (data: TodoProp, id: string) => {
  const url = `/todos/${id}`
  const config = {
    headers,
  }
  return API.put(url, data, config)
}

// todo 삭제
export const deleteTodo = (id: string) => {
  const url = `/todos/${id}`
  const config = {
    headers,
  }
  return API.delete(url, config)
}
