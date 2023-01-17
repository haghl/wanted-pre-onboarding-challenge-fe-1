import { createSlice } from '@reduxjs/toolkit'
import { TodoModalType } from '@/types/todo'

interface IHeaderSlice {
  headerType: TodoModalType
}

const initialState: IHeaderSlice = {
  headerType: 'plus',
}

const headerSlice = createSlice({
  name: 'Header',
  initialState,
  reducers: {
    setChangeHeaderType(state, action) {
      state.headerType = action.payload
    },
  },
  extraReducers: () => {},
})

export default headerSlice
