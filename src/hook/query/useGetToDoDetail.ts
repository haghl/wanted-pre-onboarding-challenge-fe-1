import { useQuery } from 'react-query'
import TodoApi from '@/api/todo'

const useGetToDoDetail = (id: string) => {
  return useQuery(['getTodoById', id], () => TodoApi.getToDoDetail(id), {
    onSuccess: (data) => {
      return data
    },
  })
}

export default useGetToDoDetail
