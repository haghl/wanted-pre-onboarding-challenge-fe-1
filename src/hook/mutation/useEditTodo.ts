import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
import TodoApi from '@/api/todo'
import { TodoEditProps } from '@/types/todo'

const useEditTodo = () => {
  const queryClient = useQueryClient()
  return useMutation((todo: TodoEditProps) => TodoApi.postEditToDo(todo), {
    onSuccess: (data) => {
      toast('todo가 수정되었습니다!')

      queryClient.invalidateQueries(['getTodoById', data.data.data.id])
    },
  })
}

export default useEditTodo
