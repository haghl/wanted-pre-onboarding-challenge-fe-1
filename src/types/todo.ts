export interface ITodoInputProps {
  title: string
  content: string
}

export interface ITodoListProps {
  title: string
  content: string
  id: string
  createdAt: string
  updatedAt: string
}

export interface ToDoPlusProps {
  open: boolean
  onClose: (bool: boolean) => void
  editType?: TodoEditProps
}

export type TodoModalType = 'plus' | 'edit'

export type TodoEditProps = ITodoInputProps & { id: string }

export interface ITodoListPropsResponse {
  data: ITodoListProps[]
}
