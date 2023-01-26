import { ITodoInputProps, TodoEditProps } from '@/types/todo'
import API from '@/utils/API'

const TodoApi = {
  getToDoList: () => {
    return API.get('/todos')
  },
  getToDoDetail: (id: string) => {
    return API.get(`/todos/${id}`)
  },
  postCreateToDo: (data: ITodoInputProps) => {
    return API.post('/todos', data)
  },
  postEditToDo: (todo: TodoEditProps) => {
    const { id, title, content } = todo
    return API.put(`/todos/${id}`, { title, content })
  },
  deleteTodo: (id: string) => {
    return API.delete(`/todos/${id}`)
  },
}

export default TodoApi
