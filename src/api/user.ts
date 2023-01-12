import { ILoginProps } from '@/types/user'
import API from '@/utils/API'

const UserApi = {
  postSignUp: (data: ILoginProps) => {
    return API.post('/users/create', data)
  },
  postLogin: (data: ILoginProps) => {
    return API.post('/users/login', data)
  },
}

export default UserApi
