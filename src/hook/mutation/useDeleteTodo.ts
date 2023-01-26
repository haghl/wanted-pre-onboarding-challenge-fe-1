import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
import TodoApi from '@/api/todo'
import router from '@/router/router'

const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation((id: string) => TodoApi.deleteTodo(id), {
    onSuccess: () => {
      toast('삭제되었습니다.')
      queryClient.invalidateQueries(['getToDos'])
      router.navigate('/', { replace: true })
    },
  })
}

export default useDeleteTodo
