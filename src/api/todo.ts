import { ITodoInputProps } from '@/types/todo'
import API from '@/utils/API'

const TodoApi = {
  getToDoList: () => {
    return API.get('/todos')
  },
  getToDoDetail: (id: string) => {
    return API.get(`/todos/:${id}`)
  },
  postCreateToDo: (data: ITodoInputProps) => {
    return API.post('/todos', data)
  },
  postEditToDo: (data: ITodoInputProps, id: string) => {
    return API.put(`/todos/${id}`, data)
  },
  deleteTodo: (id: string) => {
    return API.delete(`/todos/${id}`)
  },
}

export default TodoApi
