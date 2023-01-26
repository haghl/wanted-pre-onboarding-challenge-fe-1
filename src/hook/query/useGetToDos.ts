import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { ITodoListPropsResponse } from '@/types/todo'
import TodoApi from '@/api/todo'

const useGetToDos = () => {
  return useQuery(['getToDos'], () => TodoApi.getToDoList(), {
    select: (data: AxiosResponse<ITodoListPropsResponse>) => {
      return data.data.data
    },
    staleTime: 5000,
    cacheTime: Infinity,
  })
}

export default useGetToDos
