import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
import TodoApi from '@/api/todo'
import { ITodoInputProps } from '@/types/todo'

const useCreateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation((todo: ITodoInputProps) => TodoApi.postCreateToDo(todo), {
    onSuccess: () => {
      toast('todo가 생성되었습니다!')
      queryClient.invalidateQueries(['getToDos'])
    },
  })
}

export default useCreateTodo
